const assert = require("assert");
const { ScalewayProvider } = require("../ScalewayProvider");
const { ConfigLoader } = require("ConfigLoader");
const { testPlanDeploy, testPlanDestroy } = require("test/E2ETestUtils");

describe("ScalewayIp", async function () {
  let config;

  let provider;
  let ip;
  before(async function () {
    try {
      config = ConfigLoader({ path: "examples/multi" });
    } catch (error) {
      this.skip();
    }
    provider = await ScalewayProvider({
      name: "scaleway",
      config: config.scaleway,
    });

    const { error } = await provider.destroyAll({ all: false });
    assert(!error);

    ip = await provider.makeIp({ name: "myip" });
  });
  after(async () => {
    await provider?.destroyAll({ all: false });
  });

  it("ip resolveConfig", async function () {
    const config = await ip.resolveConfig();
    assert(config.tags);
    assert(config.tags.find((tag) => tag === provider.config().tag));
  });

  it.skip("apply and destroy", async function () {
    await testPlanDeploy({ provider });

    const live = await ip.getLive();
    assert(live);
    assert(live.id);

    await testPlanDestroy({ provider });
  });
});
