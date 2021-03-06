const assert = require("assert");
const { GoogleProvider } = require("../../GoogleProvider");
const { ConfigLoader } = require("ConfigLoader");

const {
  testPlanDeploy,
  testPlanDestroy,
} = require("../../../../test/E2ETestUtils");

describe("GcpDnsManagedZone", async function () {
  const types = ["DnsManagedZone"];
  const domain = "gcp.grucloud.com.";
  let config;
  let provider;
  let dnsManagedZone;

  before(async function () {
    try {
      config = ConfigLoader({ path: "examples/multi" });
    } catch (error) {
      this.skip();
    }
    provider = await GoogleProvider({
      name: "google",
      config: config.google,
    });

    dnsManagedZone = await provider.makeDnsManagedZone({
      name: "dns-managed-zone",
      properties: () => ({ dnsName: domain }),
    });
    const { error } = await provider.destroyAll();
    assert(!error);
  });
  after(async () => {
    await provider?.destroyAll();
  });
  it("dns managed zone config", async function () {
    const config = await dnsManagedZone.resolveConfig();
    assert(config);
    assert.equal(config.description, provider.config().managedByDescription);
    assert(Array.isArray(config.recordSet));
  });
  it("plan", async function () {
    const plan = await provider.planQuery();
    assert.equal(plan.resultDestroy.plans.length, 0);
    assert.equal(plan.resultCreate.plans.length, types.length);
  });
  it("dns managed zone apply and destroy", async function () {
    await testPlanDeploy({ provider, types });
    await testPlanDestroy({ provider, types });
  });
});
