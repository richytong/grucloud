const assert = require("assert");
const { AzureProvider } = require("../AzureProvider");
const { ConfigLoader } = require("ConfigLoader");

const {
  testPlanDeploy,
  testPlanDestroy,
} = require("../../../test/E2ETestUtils");

describe("AzProvider", async function () {
  const rgName = "resource-group";
  const vnName = "virtualNetwork";
  const subnetName = "subnet";
  let config;
  let provider;
  let resourceGroup;
  let virtualNetwork;
  let securityGroup;

  before(async function () {
    try {
      config = ConfigLoader({ path: "examples/azure" });
    } catch (error) {
      this.skip();
    }
    provider = await AzureProvider({
      name: "azure",
      config,
    });
    resourceGroup = await provider.makeResourceGroup({ name: rgName });
    virtualNetwork = await provider.makeVirtualNetwork({
      name: vnName,
      dependencies: { resourceGroup },
      properties: () => ({
        properties: {
          addressSpace: { addressPrefixes: ["10.0.0.0/16"] },
          subnets: [
            {
              name: subnetName,
              properties: { addressPrefix: "10.0.0.0/24" },
            },
          ],
        },
      }),
    });
    securityGroup = await provider.makeSecurityGroup({
      name: `security-group`,
      dependencies: { resourceGroup },
      properties: () => ({
        properties: {
          securityRules: [
            {
              name: "SSH",
              properties: {
                access: "Allow",
                direction: "Inbound",
                protocol: "Tcp",
                destinationPortRange: "22",
                destinationAddressPrefix: "*",
                sourcePortRange: "*",
                sourceAddressPrefix: "*",
                priority: 1000,
              },
            },
          ],
        },
      }),
    });
    const publicIpAddress = await provider.makePublicIpAddress({
      name: `ip`,
      dependencies: {
        resourceGroup,
      },
      properties: () => ({
        properties: {
          publicIPAllocationMethod: "Dynamic",
        },
      }),
    });
    const networkInterface = await provider.makeNetworkInterface({
      name: `network-interface`,
      dependencies: {
        resourceGroup,
        virtualNetwork,
        securityGroup,
        subnet: subnetName,
        publicIpAddress,
      },
      properties: () => ({
        properties: {
          ipConfigurations: [
            {
              name: "ipconfig",
              properties: {
                privateIPAllocationMethod: "Dynamic",
              },
            },
          ],
        },
      }),
    });

    const { MACHINE_ADMIN_USERNAME, MACHINE_ADMIN_PASSWORD } = process.env;
    assert(MACHINE_ADMIN_USERNAME);
    assert(MACHINE_ADMIN_PASSWORD);

    const vm = await provider.makeVirtualMachine({
      name: `vm`,
      dependencies: {
        resourceGroup,
        networkInterface,
      },
      properties: () => ({
        properties: {
          hardwareProfile: {
            vmSize: "Standard_A1_v2",
          },
          storageProfile: {
            imageReference: {
              // az vm image list
              offer: "UbuntuServer",
              publisher: "Canonical",
              sku: "18.04-LTS",
              version: "latest",
            },
          },
          osProfile: {
            adminUsername: MACHINE_ADMIN_USERNAME,
            computerName: "myVM",
            adminPassword: MACHINE_ADMIN_PASSWORD,
          },
        },
      }),
    });
    const { error } = await provider.destroyAll();
    assert(!error, "destroyAll ko");
  });
  after(async () => {
    //await provider?.destroyAll();
  });
  it("plan", async function () {
    const plan = await provider.planQuery();
    assert.equal(plan.resultDestroy.plans.length, 0);
    assert.equal(plan.resultCreate.plans.length, 6);
  });
  it.skip("az apply and destroy", async function () {
    await testPlanDeploy({ provider, full: true });
    await testPlanDestroy({ provider, full: true });
  });
});
