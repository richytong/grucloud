exports.azDependsOnType = [
  { type: "ResourceGroup", providerName: "azure" },
  {
    type: "VirtualNetwork",
    dependsOn: ["ResourceGroup"],
    providerName: "azure",
  },
  {
    type: "SecurityGroup",
    dependsOn: ["ResourceGroup"],
    providerName: "azure",
  },
  {
    type: "NetworkInterface",
    dependsOn: ["ResourceGroup", "VirtualNetwork", "SecurityGroup"],
    providerName: "azure",
  },
];

exports.azDependsOnInstance = [
  { name: "rg" },
  { name: "vnet", dependsOn: ["rg"] },
  { name: "sg", dependsOn: ["rg"] },
  {
    name: "network-interface",
    dependsOn: ["rg", "vnet", "sg"],
  },
];
const azPlans = [
  {
    resource: {
      name: "rg",
      type: "ResourceGroup",
      provider: "azure",
      uri: "azure::ResourceGroup::rg",
    },
  },
  {
    resource: {
      name: "vnet",
      type: "VirtualNetwork",
      provider: "azure",
      uri: "azure::VirtualNetwork::vnet",
    },
  },
  {
    resource: {
      name: "sg",
      type: "SecurityGroup",
      provider: "azure",
      uri: "azure::SecurityGroup::sg",
    },
  },
  {
    resource: {
      name: "network-interface",
      type: "NetworkInterface",
      provider: "azure",
      uri: "azure::NetworkInterface::network-interface",
    },
  },
];

const addAction = (plans, action) => plans.map((plan) => ({ ...plan, action }));

exports.azPlansCreate = () => addAction(azPlans, "CREATE");
exports.azPlansDestroy = () => addAction(azPlans, "DESTROY");

exports.awsDependsOnType = [
  { type: "Vpc", providerName: "aws" },
  { type: "InternetGateway", dependsOn: ["Vpc"], providerName: "aws" },
  { type: "Subnet", dependsOn: ["Vpc"], providerName: "aws" },
  {
    type: "RouteTables",
    dependsOn: ["Vpc", "Subnet", "InternetGateway"],
    providerName: "aws",
  },
  { type: "SecurityGroup", dependsOn: ["Vpc"], providerName: "aws" },
  {
    type: "Instance",
    dependsOn: ["Subnet", "SecurityGroup", "ElasticIpAddress"],
    providerName: "aws",
  },
  {
    type: "ElasticIpAddress",
    dependsOn: ["InternetGateway", "Instance"],
    providerName: "aws",
  },
];

exports.awsDependsOnInstance = [
  { name: "vpc" },
  { name: "ig", dependsOn: ["vpc"] },
  { name: "subnet", dependsOn: ["vpc"] },
  {
    name: "rt",
    dependsOn: ["vpc", "subnet", "ig"],
  },
  { name: "sg", dependsOn: ["vpc"] },
  {
    name: "instance",
    dependsOn: ["subnet", "sg", "eip"],
  },
  {
    name: "eip",
    dependsOn: ["ig", "instance"],
  },
];

const awsPlans = [
  {
    resource: {
      name: "vpc",
      type: "Vpc",
      provider: "aws",
      uri: "aws::Vpc::vpc",
    },
  },
  {
    resource: {
      name: "subnet",
      type: "Subnet",
      provider: "aws",
      uri: "aws::Subnet::subnet",
    },
  },
  {
    resource: {
      name: "rt",
      type: "RouteTables",
      provider: "aws",
      uri: "aws::RouteTables::rt",
    },
  },
  {
    resource: {
      name: "sg",
      type: "SecurityGroup",
      provider: "aws",
      uri: "aws::SecurityGroup::sg",
    },
  },
  {
    resource: {
      name: "instance",
      type: "Instance",
      provider: "aws",
      uri: "aws::Instance::instance",
    },
  },
];

exports.awsPlansCreate = () => addAction(awsPlans, "CREATE");
exports.awsPlansDestroy = () => addAction(awsPlans, "DESTROY");
