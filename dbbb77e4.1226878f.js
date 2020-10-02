(window.webpackJsonp=window.webpackJsonp||[]).push([[51],{151:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return c})),n.d(t,"metadata",(function(){return o})),n.d(t,"rightToc",(function(){return i})),n.d(t,"default",(function(){return u}));var r=n(2),a=(n(0),n(160));const c={id:"AzureGettingStarted",title:"Getting Started"},o={id:"azure/AzureGettingStarted",isDocsHomePage:!1,title:"Getting Started",description:"Let's create a simple infrastructure with the following resources:",source:"@site/docs/azure/AzureGettingStarted.md",permalink:"/docs/azure/AzureGettingStarted",sidebar:"someSidebar",previous:{title:"Requirements",permalink:"/docs/azure/AzureRequirements"},next:{title:"Resource Group",permalink:"/docs/azure/resources/ResourceGroup"}},i=[{value:"Getting the code",id:"getting-the-code",children:[{value:"Environment",id:"environment",children:[]},{value:"Config",id:"config",children:[]}]},{value:"Plan",id:"plan",children:[]},{value:"Deploy",id:"deploy",children:[]},{value:"List",id:"list",children:[]},{value:"Destroy",id:"destroy",children:[]}],s={rightToc:i};function u({components:e,...t}){return Object(a.b)("wrapper",Object(r.a)({},s,t,{components:e,mdxType:"MDXLayout"}),Object(a.b)("p",null,"Let's create a simple infrastructure with the following resources:"),Object(a.b)("ul",null,Object(a.b)("li",{parentName:"ul"},Object(a.b)("a",Object(r.a)({parentName:"li"},{href:"./resources/ResourceGroup"}),"Resource Group")),Object(a.b)("li",{parentName:"ul"},Object(a.b)("a",Object(r.a)({parentName:"li"},{href:"./resources/VirtualNetwork"}),"Virtual Network")),Object(a.b)("li",{parentName:"ul"},Object(a.b)("a",Object(r.a)({parentName:"li"},{href:"./resources/SecurityGroup"}),"Security Group")),Object(a.b)("li",{parentName:"ul"},Object(a.b)("a",Object(r.a)({parentName:"li"},{href:"./resources/PublicIpAddress"}),"Public Ip Address")),Object(a.b)("li",{parentName:"ul"},Object(a.b)("a",Object(r.a)({parentName:"li"},{href:"./resources/NetworkInterface"}),"Network Interface")),Object(a.b)("li",{parentName:"ul"},Object(a.b)("a",Object(r.a)({parentName:"li"},{href:"./resources/VirtualMachine"}),"Virtual Machine"))),Object(a.b)("p",null,"First of all, ensure all the Azure prerequisites has been met: ",Object(a.b)("a",Object(r.a)({parentName:"p"},{href:"/docs/azure/AzureRequirements"}),"AzureRequirements")),Object(a.b)("h2",{id:"getting-the-code"},"Getting the code"),Object(a.b)("p",null,"Install the grucloud command line utility: ",Object(a.b)("strong",{parentName:"p"},"gc")),Object(a.b)("pre",null,Object(a.b)("code",Object(r.a)({parentName:"pre"},{className:"language-bash"}),"npm i -g @grucloud/core\n")),Object(a.b)("p",null,"Clone the code and go to one of the azure examples:"),Object(a.b)("pre",null,Object(a.b)("code",Object(r.a)({parentName:"pre"},{className:"language-bash"}),"git clone git@github.com:grucloud/grucloud.git\n")),Object(a.b)("pre",null,Object(a.b)("code",Object(r.a)({parentName:"pre"},{className:"language-bash"}),"cd grucloud/examples/azure\n")),Object(a.b)("pre",null,Object(a.b)("code",Object(r.a)({parentName:"pre"},{className:"language-bash"}),"npm install\n")),Object(a.b)("h3",{id:"environment"},"Environment"),Object(a.b)("pre",null,Object(a.b)("code",Object(r.a)({parentName:"pre"},{className:"language-sh"}),"cp config/default.env.example config/default.env\n")),Object(a.b)("p",null,"Edit ",Object(a.b)("strong",{parentName:"p"},"config/default.env")," and set the correct values:"),Object(a.b)("pre",null,Object(a.b)("code",Object(r.a)({parentName:"pre"},{className:"language-sh"}),"TENANT_ID=\nSUBSCRIPTION_ID=\nAPP_ID=\nPASSWORD=\nMACHINE_ADMIN_USERNAME=\nMACHINE_ADMIN_PASSWORD=\n")),Object(a.b)("blockquote",null,Object(a.b)("p",{parentName:"blockquote"},"See ",Object(a.b)("a",Object(r.a)({parentName:"p"},{href:"/docs/azure/AzureRequirements"}),"AzureRequirements")," to retrieve these informations")),Object(a.b)("h3",{id:"config"},"Config"),Object(a.b)("p",null,"Edit ",Object(a.b)("strong",{parentName:"p"},"config/default.js")," and set the location:"),Object(a.b)("pre",null,Object(a.b)("code",Object(r.a)({parentName:"pre"},{className:"language-js"}),'module.exports = () => ({\n  location: "uksouth",\n});\n')),Object(a.b)("p",null,"To find out the list of locations:"),Object(a.b)("pre",null,Object(a.b)("code",Object(r.a)({parentName:"pre"},{}),"az account list-locations -o table\n")),Object(a.b)("p",null,"Now it is time to edit the infrastructure ",Object(a.b)("strong",{parentName:"p"},"iac.js")," file that describes the architecture."),Object(a.b)("pre",null,Object(a.b)("code",Object(r.a)({parentName:"pre"},{className:"language-js"}),'const assert = require("assert");\nconst { AzureProvider } = require("@grucloud/core");\n\nexports.createStack = async ({ config }) => {\n  const { stage } = config;\n  assert(stage);\n  // Create an Azure provider\n  const provider = await AzureProvider({ name: "azure", config });\n\n  // https://docs.microsoft.com/en-us/rest/api/apimanagement/2019-12-01/apimanagementservice/createorupdate\n  const rg = await provider.makeResourceGroup({\n    name: `resource-group-${stage}`,\n  });\n\n  // https://docs.microsoft.com/en-us/rest/api/virtualnetwork/virtualnetworks/createorupdate#request-body\n  const vnet = await provider.makeVirtualNetwork({\n    name: `virtual-network-${stage}`,\n    dependencies: { resourceGroup: rg },\n    properties: () => ({\n      properties: {\n        addressSpace: { addressPrefixes: ["10.0.0.0/16"] },\n        subnets: [\n          {\n            name: `subnet-${stage}`,\n            properties: {\n              addressPrefix: "10.0.0.0/24",\n            },\n          },\n        ],\n      },\n    }),\n  });\n\n  // https://docs.microsoft.com/en-us/rest/api/virtualnetwork/networksecuritygroups/createorupdate#request-body\n  const sg = await provider.makeSecurityGroup({\n    name: `security-group-${stage}`,\n    dependencies: { resourceGroup: rg },\n    properties: () => ({\n      properties: {\n        securityRules: [\n          {\n            name: "SSH",\n            properties: {\n              access: "Allow",\n              direction: "Inbound",\n              protocol: "Tcp",\n              destinationPortRange: "22",\n              destinationAddressPrefix: "*",\n              sourcePortRange: "*",\n              sourceAddressPrefix: "*",\n              priority: 1000,\n            },\n          },\n        ],\n      },\n    }),\n  });\n\n  // https://docs.microsoft.com/en-us/rest/api/virtualnetwork/publicipaddresses/createorupdate#request-body\n  const publicIpAddress = await provider.makePublicIpAddress({\n    name: `ip-${stage}`,\n    dependencies: {\n      resourceGroup: rg,\n    },\n    properties: () => ({\n      properties: {\n        publicIPAllocationMethod: "Dynamic",\n      },\n    }),\n  });\n  // https://docs.microsoft.com/en-us/rest/api/virtualnetwork/networkinterfaces/createorupdate#request-body\n  const networkInterface = await provider.makeNetworkInterface({\n    name: `network-interface-${stage}`,\n    dependencies: {\n      resourceGroup: rg,\n      virtualNetwork: vnet,\n      securityGroup: sg,\n      subnet: `subnet-${stage}`,\n      publicIpAddress,\n    },\n    properties: () => ({\n      properties: {\n        ipConfigurations: [\n          {\n            name: "ipconfig",\n            properties: {\n              privateIPAllocationMethod: "Dynamic",\n            },\n          },\n        ],\n      },\n    }),\n  });\n\n  const { MACHINE_ADMIN_USERNAME, MACHINE_ADMIN_PASSWORD } = process.env;\n  assert(MACHINE_ADMIN_USERNAME);\n  assert(MACHINE_ADMIN_PASSWORD);\n\n  // https://docs.microsoft.com/en-us/rest/api/compute/virtualmachines/createorupdate\n  const vm = await provider.makeVirtualMachine({\n    name: `vm-${stage}`,\n    dependencies: {\n      resourceGroup: rg,\n      networkInterface,\n    },\n    properties: () => ({\n      properties: {\n        hardwareProfile: {\n          vmSize: "Standard_A1_v2",\n        },\n        storageProfile: {\n          imageReference: {\n            // az vm image list\n            offer: "UbuntuServer",\n            publisher: "Canonical",\n            sku: "18.04-LTS",\n            version: "latest",\n          },\n        },\n        osProfile: {\n          adminUsername: MACHINE_ADMIN_USERNAME,\n          computerName: "myVM",\n          adminPassword: MACHINE_ADMIN_PASSWORD,\n        },\n      },\n    }),\n  });\n  return { provider };\n};\n')),Object(a.b)("h2",{id:"plan"},"Plan"),Object(a.b)("p",null,"Find out which resources are going to be allocated:"),Object(a.b)("pre",null,Object(a.b)("code",Object(r.a)({parentName:"pre"},{className:"language-sh"}),"gc plan\n")),Object(a.b)("h2",{id:"deploy"},"Deploy"),Object(a.b)("p",null,"Happy with the expected plan ? Deploy it now:"),Object(a.b)("pre",null,Object(a.b)("code",Object(r.a)({parentName:"pre"},{className:"language-sh"}),"gc apply\n")),Object(a.b)("h2",{id:"list"},"List"),Object(a.b)("p",null,"List the available resources with:"),Object(a.b)("pre",null,Object(a.b)("code",Object(r.a)({parentName:"pre"},{className:"language-sh"}),"gc list\n")),Object(a.b)("h2",{id:"destroy"},"Destroy"),Object(a.b)("p",null,"Time to destroy the resouces allocated:"),Object(a.b)("pre",null,Object(a.b)("code",Object(r.a)({parentName:"pre"},{className:"language-sh"}),"gc destroy\n")))}u.isMDXComponent=!0},160:function(e,t,n){"use strict";n.d(t,"a",(function(){return p})),n.d(t,"b",(function(){return m}));var r=n(0),a=n.n(r);function c(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){c(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},c=Object.keys(e);for(r=0;r<c.length;r++)n=c[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var c=Object.getOwnPropertySymbols(e);for(r=0;r<c.length;r++)n=c[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var u=a.a.createContext({}),l=function(e){var t=a.a.useContext(u),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},p=function(e){var t=l(e.components);return a.a.createElement(u.Provider,{value:t},e.children)},b={inlineCode:"code",wrapper:function(e){var t=e.children;return a.a.createElement(a.a.Fragment,{},t)}},d=a.a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,c=e.originalType,o=e.parentName,u=s(e,["components","mdxType","originalType","parentName"]),p=l(n),d=r,m=p["".concat(o,".").concat(d)]||p[d]||b[d]||c;return n?a.a.createElement(m,i(i({ref:t},u),{},{components:n})):a.a.createElement(m,i({ref:t},u))}));function m(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var c=n.length,o=new Array(c);o[0]=d;var i={};for(var s in t)hasOwnProperty.call(t,s)&&(i[s]=t[s]);i.originalType=e,i.mdxType="string"==typeof e?e:r,o[1]=i;for(var u=2;u<c;u++)o[u]=n[u];return a.a.createElement.apply(null,o)}return a.a.createElement.apply(null,n)}d.displayName="MDXCreateElement"}}]);