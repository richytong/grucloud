const assert = require("assert");
const GoogleProvider = require("../GoogleProvider");
const { ConfigLoader } = require("ConfigLoader");

const {
  testPlanDeploy,
  testPlanDestroy,
} = require("../../../test/E2ETestUtils");

describe("GoogleAddress", async function () {
  const addressName = "myaddress-test";
  let provider;
  let address;
  before(async function () {
    try {
      provider = await GoogleProvider({
        name: "google",
        config: ConfigLoader({ baseDir: __dirname }),
      });
      address = provider.makeAddress({ name: addressName });
      await provider.destroyAll();
    } catch (error) {
      assert(error.code, 422);
      this.skip();
    }
  });
  after(async () => {
    await provider?.destroyAll();
  });
  it("address config", async function () {
    const config = await address.resolveConfig();
    assert(config);
    assert.equal(config.name, addressName);
    assert.equal(config.description, provider.config.managedByDescription);
  });
  it("lives", async function () {
    const lives = await provider.listLives();
    //console.log("lives ip", lives);
  });
  it("plan", async function () {
    const plan = await provider.planQuery();
    assert.equal(plan.destroy.length, 0);
    assert.equal(plan.newOrUpdate.length, 1);
  });
  it("apply and destroy", async function () {
    await testPlanDeploy({ provider });
    await testPlanDestroy({ provider });
  });
});
