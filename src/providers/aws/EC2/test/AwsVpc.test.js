const assert = require("assert");
const AWS = require("aws-sdk");
const { ConfigLoader } = require("ConfigLoader");
const { AwsProvider } = require("../../AwsProvider");
const { testPlanDeploy, testPlanDestroy } = require("test/E2ETestUtils");
const { CheckTagsEC2 } = require("../../AwsTagCheck");
const logger = require("../../../../logger")({ prefix: "AwsVpc" });
const { tos } = require("../../../../tos");

describe("AwsVpc", async function () {
  let config;
  let provider;
  let vpc;
  let subnet;
  let rt;
  let sg;
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

    const { results: lives } = await provider.listLives({ our: true });
    assert.equal(lives.length, 0);

    vpc = await provider.makeVpc({
      name: "vpc",
      properties: () => ({
        CidrBlock: "10.0.0.0/16",
      }),
    });

    subnet = await provider.makeSubnet({
      name: "subnetName",
      dependencies: { vpc },
      properties: () => ({
        CidrBlock: "10.0.1.0/24",
      }),
    });
    rt = await provider.makeRouteTables({
      name: "rt",
      dependencies: { vpc, subnet },
      properties: () => ({}),
    });
    sg = await provider.makeSecurityGroup({
      name: "sg",
      dependencies: { vpc },
      properties: () => ({
        create: {
          Description: "Security Group Description",
        },
        ingress: {
          IpPermissions: [
            {
              FromPort: 22,
              IpProtocol: "tcp",
              IpRanges: [
                {
                  CidrIp: "0.0.0.0/0",
                },
              ],
              Ipv6Ranges: [
                {
                  CidrIpv6: "::/0",
                },
              ],
              ToPort: 22,
            },
          ],
        },
      }),
    });
  });
  after(async () => {
    //await provider?.destroyAll();
  });
  it("vpc name", async function () {
    assert.equal(vpc.name, "vpc");
  });
  it("vpc getLive", async function () {
    const live = await vpc.getLive();
  });
  it("vpc listLives", async function () {
    const {
      results: [vpcs],
    } = await provider.listLives({ types: ["Vpc"] });
    assert(vpcs);
    const vpcDefault = vpcs.resources.find((vpc) => vpc.data.IsDefault);
    assert(vpcDefault);
  });
  it("vpc listLives canBeDeleted", async function () {
    const { results } = await provider.listLives({
      types: ["Vpc"],
      canBeDeleted: true,
    });
    assert(isEmpty(results));
  });

  it.skip("vpc apply and destroy", async function () {
    await testPlanDeploy({ provider });
    const vpcLive = await vpc.getLive();
    const { VpcId } = vpcLive;

    CheckTagsEC2({
      config: provider.config(),
      tags: vpcLive.Tags,
      name: vpc.name,
    });

    await testPlanDestroy({ provider, full: false });
  });
  it.skip("vpc destroy vpc", async function () {
    await testPlanDeploy({ provider });
    const vpcLive = await vpc.getLive();
    const { VpcId } = vpcLive;
    await vpc.client.destroy({ id: VpcId });
  });
});
