const assert = require("assert");
const { GoogleProvider } = require("@grucloud/core");

const createResources = async ({ provider, resources: { serviceAccount } }) => {
  const iamBinding = await provider.makeIamBinding({
    name: "roles/storage.admin",
    dependencies: { serviceAccounts: [serviceAccount] },
    properties: () => ({}),
  });

  return {
    iamBinding,
  };
};

exports.createResources = createResources;

exports.createStack = async ({ config }) => {
  const provider = await GoogleProvider({ name: "google", config });
  const { stage } = provider.config();
  assert(stage, "missing stage");

  const serviceAccount = await provider.makeServiceAccount({
    name: `sa-${stage}`,
    properties: () => ({
      serviceAccount: {
        displayName: "SA dev",
      },
    }),
  });

  const resources = await createResources({
    provider,
    resources: { serviceAccount },
  });

  return {
    provider,
    resources,
  };
};
