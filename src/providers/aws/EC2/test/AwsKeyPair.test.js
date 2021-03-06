const assert = require("assert");
const { ConfigLoader } = require("ConfigLoader");
const { AwsProvider } = require("../../AwsProvider");

describe("AwsKeyPair", async function () {
  let config;
  let provider;
  let keyPair;

  before(async function () {
    try {
      config = ConfigLoader({ path: "examples/multi" });
    } catch (error) {
      this.skip();
    }
    provider = await AwsProvider({
      name: "aws",
      config: config.aws,
    });

    const { error } = await provider.destroyAll();
    assert(!error);

    keyPair = await provider.useKeyPair({
      name: "kp",
    });
  });
  after(async () => {
    await provider?.destroyAll();
  });
  it("keyPair name", async function () {
    assert.equal(keyPair.name, "kp");
  });
  it("keyPair getLive", async function () {
    const live = await keyPair.getLive();
    assert.equal(live.KeyName, keyPair.name);
  });

  it("keyPair name not found on server", async function () {
    try {
      await provider.useKeyPair({
        name: "idonotexist",
      });
      assert(false);
    } catch (error) {
      assert.equal(error.code, 400);
      assert(error.message);
    }
  });
});
