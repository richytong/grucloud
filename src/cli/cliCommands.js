const _ = require("lodash");
const plu = require("pluralize");
const { runAsyncCommand } = require("./cliUtils");
const { displayPlan, displayLive } = require("./displayUtils");
const prompts = require("prompts");
const colors = require("colors/safe");

const {
  map,
  pipe,
  switchCase,
  reduce,
  tap,
  assign,
  all,
  filter,
} = require("rubico");
const { isEmpty, pluck, flatten } = require("ramda");

const plansHasSuccess = all(({ results }) => results.success);

const formatResource = ({ provider, type, name }) =>
  `${provider}/${type}/${name}`;

const countDeployResources = reduce(
  (acc, value) => {
    return {
      providers: acc.providers + 1,
      create: acc.create + value.plan.newOrUpdate.length,
      destroy: acc.destroy + value.plan.destroy.length,
    };
  },
  { providers: 0, create: 0, destroy: 0 }
);

const hasPlans = pipe([
  countDeployResources,
  ({ create, destroy }) => create > 0 || destroy > 0,
]);

//Query Plan
//TODO use assign
const doPlanQuery = async (providers) =>
  await map(async (provider) => ({
    provider,
    plan: await pipe([
      () =>
        runAsyncCommand(
          () => provider.plan(),
          `Query Plan for ${provider.name()}`
        ),
      displayPlan,
    ])(),
  }))(providers);

const displayQueryNoPlan = () =>
  console.log("Nothing to deploy, everything is up to date");

const displayQueryPlanSummary = ({ providers, create, destroy }) =>
  console.log(
    `${plu("resource", create, true)} to deploy${
      destroy > 0 ? ` and ${plu("resource", destroy, true)} to destroy` : ""
    } on ${plu("provider", providers, true)}`
  );

const planQuery = async ({ infra }) =>
  pipe([
    doPlanQuery,
    //tap(console.log),
    switchCase([
      hasPlans,
      pipe([countDeployResources, displayQueryPlanSummary]),
      displayQueryNoPlan,
    ]),
  ])(infra.providers);

exports.planQuery = planQuery;

//Deploy plan
exports.planDeploy = async ({ infra, options }) => {
  const processNoPlan = () => {
    console.log("Nothing to deploy");
  };

  const abortDeploy = () => {
    console.log("Deployment aborted");
  };

  const promptConfirmDeploy = async (allPlans) => {
    return await pipe([
      countDeployResources,
      async ({ create, destroy }) =>
        await prompts({
          type: "confirm",
          name: "confirmDeploy",
          message: `Are you sure to deploy ${plu("resource", create, true)}${
            destroy > 0 ? ` and destroy ${plu("resource", destroy, true)}` : ""
          } ?`,
          initial: false,
        }),
      ({ confirmDeploy }) => confirmDeploy,
    ])(allPlans);
  };

  const displayDeploySuccess = pipe([
    countDeployResources,
    ({ create, destroy }) =>
      console.log(
        `${plu("resource", create, true)} deployed${
          destroy > 0 ? ` and ${plu("resource", destroy, true)} destroyed` : ""
        }`
      ),
  ]);

  const doPlanDeploy = pipe([
    //tap((x) => console.log("doPlanDeploy begin ", x)),
    assign({
      results: async ({ provider, plan }) =>
        await runAsyncCommand(
          () => provider.deployPlan(plan),
          `Deploying resources on provider ${provider.name()}`
        ),
    }),
    //tap((x) => console.log("doPlanDeploy end", x)),
  ]);

  const displayDeployError = ({ item, error }) => {
    console.log(`Cannot deploy resource ${formatResource(item.resource)}`);
    console.error(error.message);
  };

  const displayDeployErrors = pipe([
    //tap((x) => console.log("displayDeployErrors", x)),
    filter(({ results: { success } }) => !success),
    flatten,
    pluck("results"),
    pluck("results"),
    flatten,
    map(tap(displayDeployError)),
  ]);

  const doPlansDeploy = pipe([
    map(doPlanDeploy),
    switchCase([plansHasSuccess, displayDeploySuccess, displayDeployErrors]),
  ]);

  const processDeployPlans = switchCase([
    () => options.force,
    doPlansDeploy,
    promptConfirmDeploy,
    doPlansDeploy,
    abortDeploy,
  ]);

  await pipe([
    doPlanQuery,
    switchCase([hasPlans, processDeployPlans, processNoPlan]),
  ])(infra.providers);
};

// Destroy plan
exports.planDestroy = async ({ infra, options }) => {
  const hasEmptyPlan = pipe([pluck("plan"), flatten, isEmpty]);

  const processHasNoPlan = () => {
    console.log("No resources to destroy");
  };

  const countDestroyed = reduce((acc, value) => acc + value.plan.length, 0);

  const displayDestroySuccess = pipe([
    countDestroyed,
    (length) => console.log(`${plu("resource", length, true)} destroyed`),
  ]);

  const promptConfirmDestroy = async (plans) => {
    return await pipe([
      countDestroyed,
      async (length) =>
        await prompts({
          type: "confirm",
          name: "confirmDestroy",
          message: colors.red(
            `Are you sure to destroy these ${plu("resource", length, true)} ?`
          ),
          initial: false,
        }),
      ({ confirmDestroy }) => confirmDestroy,
    ])(plans);
  };

  const doPlanDestroy = pipe([
    assign({
      results: async ({ provider, plan }) =>
        await runAsyncCommand(
          () => provider.destroyPlan(plan),
          `Destroying ${plu(
            "resource",
            plan.length,
            true
          )} on provider ${provider.name()}`
        ),
    }),
  ]);

  const displayDestroyError = ({ item, error }) => {
    console.log(`Cannot destroy resource ${formatResource(item.resource)}`);
    // TODO why error is sometimes undefined ?
    console.error(error?.message);
  };

  const displayDestroyErrors = pipe([
    filter(({ results: { success } }) => !success),
    flatten,
    pluck("results"),
    pluck("results"),
    flatten,
    map(tap(displayDestroyError)),
  ]);

  const doPlansDestroy = pipe([
    map(doPlanDestroy),
    switchCase([plansHasSuccess, displayDestroySuccess, displayDestroyErrors]),
  ]);

  const processDestroyPlans = switchCase([
    () => options.force,
    doPlansDestroy,
    promptConfirmDestroy,
    doPlansDestroy,
    () => {
      console.log("Aborted");
    },
  ]);

  const findDestroy = async (provider) => {
    return {
      provider,
      plan: await pipe([
        async () => await provider.planFindDestroy(options),
        tap((plan) =>
          displayPlan({
            providerName: provider.name(),
            newOrUpdate: [],
            destroy: plan,
          })
        ),
      ])(),
    };
  };

  await pipe([
    async (providers) => await map(findDestroy)(providers),
    //tap((x) => console.log(JSON.stringify(x, null, 4))),
    switchCase([hasEmptyPlan, processHasNoPlan, processDestroyPlans]),
  ])(infra.providers);
};

const countResources = reduce(
  (acc, value) => ({
    providers: acc.providers + 1,
    types: reduce((acc) => acc + 1, acc.types)(value),
    resources: reduce(
      (acc, value) => acc + value.resources.length,
      acc.resources
    )(value),
  }),
  { providers: 0, types: 0, resources: 0 }
);

const displayNoList = () => console.log("No live resources to list");
const displayListResults = ({ providers, types, resources }) => {
  console.log(
    `${plu("resource", resources, true)}, ${plu("type", types, true)}, ${plu(
      "provider",
      providers,
      true
    )}`
  );
};

const isEmptyList = pipe([flatten, isEmpty]);

//List all
exports.list = async ({ infra, options }) =>
  await pipe([
    async (providers) =>
      await map(
        async (provider) =>
          await pipe([
            () =>
              runAsyncCommand(
                () => provider.listLives(options),
                `List for ${provider.name()}`
              ),
            tap((targets) =>
              displayLive({ providerName: provider.name(), targets })
            ),
          ])()
      )(providers),
    //tap(console.log),
    switchCase([
      isEmptyList,
      displayNoList,
      pipe([countResources, displayListResults]),
    ]),
  ])(infra.providers);
