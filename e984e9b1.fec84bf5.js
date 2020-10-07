(window.webpackJsonp=window.webpackJsonp||[]).push([[56],{157:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return c})),n.d(t,"metadata",(function(){return o})),n.d(t,"rightToc",(function(){return i})),n.d(t,"default",(function(){return p}));var a=n(2),r=(n(0),n(161));const c={id:"IamPolicy",title:"Iam Policy"},o={id:"aws/resources/IAM/IamPolicy",isDocsHomePage:!1,title:"Iam Policy",description:"Provides an Iam Policy.",source:"@site/docs/aws/resources/IAM/IamPolicy.md",permalink:"/docs/aws/resources/IAM/IamPolicy",sidebar:"someSidebar",previous:{title:"Iam Group",permalink:"/docs/aws/resources/IAM/IamGroup"},next:{title:"Iam Role",permalink:"/docs/aws/resources/IAM/IamRole"}},i=[{value:"Attach a policy to a role",id:"attach-a-policy-to-a-role",children:[]},{value:"Attach a policy to a user",id:"attach-a-policy-to-a-user",children:[]},{value:"Attach a policy to a group",id:"attach-a-policy-to-a-group",children:[]},{value:"Examples",id:"examples",children:[]},{value:"Properties",id:"properties",children:[]},{value:"Dependencies",id:"dependencies",children:[]},{value:"AWS CLI",id:"aws-cli",children:[]}],l={rightToc:i};function p({components:e,...t}){return Object(r.b)("wrapper",Object(a.a)({},l,t,{components:e,mdxType:"MDXLayout"}),Object(r.b)("p",null,"Provides an Iam Policy."),Object(r.b)("p",null,"The examples below create a policy and add it to a role, a user or a group."),Object(r.b)("h3",{id:"attach-a-policy-to-a-role"},"Attach a policy to a role"),Object(r.b)("pre",null,Object(r.b)("code",Object(a.a)({parentName:"pre"},{className:"language-js"}),'const iamRole = await provider.makeIamRole({\n  name: "my-role",\n  properties: () => ({\n    AssumeRolePolicyDocument: {\n      Version: "2012-10-17",\n      Statement: [\n        {\n          Action: "sts:AssumeRole",\n          Principal: {\n            Service: "ec2.amazonaws.com",\n          },\n          Effect: "Allow",\n          Sid: "",\n        },\n      ],\n    },\n  }),\n});\n\nconst iamPolicy = await provider.makeIamPolicy({\n  name: "my-policy",\n  dependencies: { iamRole },\n  properties: () => ({\n    PolicyDocument: {\n      Version: "2012-10-17",\n      Statement: [\n        {\n          Action: ["ec2:Describe*"],\n          Effect: "Allow",\n          Resource: "*",\n        },\n      ],\n    },\n    Description: "Allow ec2:Describe",\n    Path: "/",\n  }),\n});\n')),Object(r.b)("h3",{id:"attach-a-policy-to-a-user"},"Attach a policy to a user"),Object(r.b)("pre",null,Object(r.b)("code",Object(a.a)({parentName:"pre"},{className:"language-js"}),'const iamUser = await provider.makeIamUser({\n  name: "Alice",\n  properties: () => ({}),\n});\n\nconst iamPolicy = await provider.makeIamPolicy({\n  name: "my-policy",\n  dependencies: { iamUser },\n  properties: () => ({\n    PolicyDocument: {\n      Version: "2012-10-17",\n      Statement: [\n        {\n          Action: ["ec2:Describe*"],\n          Effect: "Allow",\n          Resource: "*",\n        },\n      ],\n    },\n    Description: "Allow ec2:Describe",\n    Path: "/",\n  }),\n});\n')),Object(r.b)("h3",{id:"attach-a-policy-to-a-group"},"Attach a policy to a group"),Object(r.b)("pre",null,Object(r.b)("code",Object(a.a)({parentName:"pre"},{className:"language-js"}),'const iamGroup = await provider.makeIamGroup({\n  name: "Admin",\n  properties: () => ({}),\n});\n\nconst iamPolicy = await provider.makeIamPolicy({\n  name: "policy-ec2-describe",\n  dependencies: { iamGroup },\n  properties: () => ({\n    PolicyDocument: {\n      Version: "2012-10-17",\n      Statement: [\n        {\n          Action: ["ec2:Describe*"],\n          Effect: "Allow",\n          Resource: "*",\n        },\n      ],\n    },\n    Description: "Allow ec2:Describe",\n  }),\n});\n')),Object(r.b)("h3",{id:"examples"},"Examples"),Object(r.b)("ul",null,Object(r.b)("li",{parentName:"ul"},Object(r.b)("a",Object(a.a)({parentName:"li"},{href:"https://github.com/grucloud/grucloud/blob/master/examples/aws/iam/iac.js"}),"simple example"))),Object(r.b)("h3",{id:"properties"},"Properties"),Object(r.b)("ul",null,Object(r.b)("li",{parentName:"ul"},Object(r.b)("a",Object(a.a)({parentName:"li"},{href:"https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/IAM.html#createPolicy-property"}),"properties list"))),Object(r.b)("h3",{id:"dependencies"},"Dependencies"),Object(r.b)("ul",null,Object(r.b)("li",{parentName:"ul"},Object(r.b)("a",Object(a.a)({parentName:"li"},{href:"./IamRole"}),"IamRole")),Object(r.b)("li",{parentName:"ul"},Object(r.b)("a",Object(a.a)({parentName:"li"},{href:"./IamUser"}),"IamUser")),Object(r.b)("li",{parentName:"ul"},Object(r.b)("a",Object(a.a)({parentName:"li"},{href:"./IamGroup"}),"IamGroup"))),Object(r.b)("h3",{id:"aws-cli"},"AWS CLI"),Object(r.b)("p",null,"List all iam policies"),Object(r.b)("pre",null,Object(r.b)("code",Object(a.a)({parentName:"pre"},{}),"aws iam list-policies --scope Local\n")),Object(r.b)("p",null,"Delete a policy:"),Object(r.b)("pre",null,Object(r.b)("code",Object(a.a)({parentName:"pre"},{}),"aws iam delete-policy --policy-arn arn:aws:iam::840541460064:role/role-example\n\n")),Object(r.b)("p",null,"Detach a policy:"),Object(r.b)("pre",null,Object(r.b)("code",Object(a.a)({parentName:"pre"},{}),"aws iam detach-user-policy --user-name alice --policy-arn arn:aws:iam::840541460064:policy/policy-example-3\n")))}p.isMDXComponent=!0},161:function(e,t,n){"use strict";n.d(t,"a",(function(){return m})),n.d(t,"b",(function(){return d}));var a=n(0),r=n.n(a);function c(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){c(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},c=Object.keys(e);for(a=0;a<c.length;a++)n=c[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var c=Object.getOwnPropertySymbols(e);for(a=0;a<c.length;a++)n=c[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var p=r.a.createContext({}),s=function(e){var t=r.a.useContext(p),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},m=function(e){var t=s(e.components);return r.a.createElement(p.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return r.a.createElement(r.a.Fragment,{},t)}},b=r.a.forwardRef((function(e,t){var n=e.components,a=e.mdxType,c=e.originalType,o=e.parentName,p=l(e,["components","mdxType","originalType","parentName"]),m=s(n),b=a,d=m["".concat(o,".").concat(b)]||m[b]||u[b]||c;return n?r.a.createElement(d,i(i({ref:t},p),{},{components:n})):r.a.createElement(d,i({ref:t},p))}));function d(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var c=n.length,o=new Array(c);o[0]=b;var i={};for(var l in t)hasOwnProperty.call(t,l)&&(i[l]=t[l]);i.originalType=e,i.mdxType="string"==typeof e?e:a,o[1]=i;for(var p=2;p<c;p++)o[p]=n[p];return r.a.createElement.apply(null,o)}return r.a.createElement.apply(null,n)}b.displayName="MDXCreateElement"}}]);