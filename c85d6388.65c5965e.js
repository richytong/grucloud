(window.webpackJsonp=window.webpackJsonp||[]).push([[49],{150:function(e,r,t){"use strict";t.r(r),t.d(r,"frontMatter",(function(){return o})),t.d(r,"metadata",(function(){return c})),t.d(r,"rightToc",(function(){return u})),t.d(r,"default",(function(){return l}));var n=t(2),a=(t(0),t(162));const o={id:"ResourceGroup",title:"Resource Group"},c={id:"azure/resources/ResourceGroup",isDocsHomePage:!1,title:"Resource Group",description:"A container for other resources:",source:"@site/docs/azure/resources/ResourceGroup.md",permalink:"/docs/azure/resources/ResourceGroup",sidebar:"someSidebar",previous:{title:"Getting Started",permalink:"/docs/azure/AzureGettingStarted"},next:{title:"Virtual Network",permalink:"/docs/azure/resources/VirtualNetwork"}},u=[{value:"Examples",id:"examples",children:[]},{value:"Properties",id:"properties",children:[]},{value:"Used By",id:"used-by",children:[]}],i={rightToc:u};function l({components:e,...r}){return Object(a.b)("wrapper",Object(n.a)({},i,r,{components:e,mdxType:"MDXLayout"}),Object(a.b)("p",null,"A container for other resources:"),Object(a.b)("pre",null,Object(a.b)("code",Object(n.a)({parentName:"pre"},{className:"language-js"}),"const resourceGroup = await provider.makeResourceGroup({\n  name: `resource-group`,\n});\n")),Object(a.b)("h3",{id:"examples"},"Examples"),Object(a.b)("ul",null,Object(a.b)("li",{parentName:"ul"},Object(a.b)("a",Object(n.a)({parentName:"li"},{href:"https://github.com/grucloud/grucloud/blob/master/examples/azure/iac.js#9"}),"basic example"))),Object(a.b)("h3",{id:"properties"},"Properties"),Object(a.b)("ul",null,Object(a.b)("li",{parentName:"ul"},Object(a.b)("a",Object(n.a)({parentName:"li"},{href:"https://docs.microsoft.com/en-us/rest/api/apimanagement/2019-12-01/apimanagementservice/createorupdate#request-body"}),"all properties"))),Object(a.b)("h3",{id:"used-by"},"Used By"),Object(a.b)("ul",null,Object(a.b)("li",{parentName:"ul"},Object(a.b)("a",Object(n.a)({parentName:"li"},{href:"./VirtualNetwork"}),"VirtualNetwork")),Object(a.b)("li",{parentName:"ul"},Object(a.b)("a",Object(n.a)({parentName:"li"},{href:"./SecurityGroup"}),"SecurityGroup")),Object(a.b)("li",{parentName:"ul"},Object(a.b)("a",Object(n.a)({parentName:"li"},{href:"./NetworkInterface"}),"NetworkInterface")),Object(a.b)("li",{parentName:"ul"},Object(a.b)("a",Object(n.a)({parentName:"li"},{href:"./PublicIpAddress"}),"PublicIpAddress")),Object(a.b)("li",{parentName:"ul"},Object(a.b)("a",Object(n.a)({parentName:"li"},{href:"./VirtualMachine"}),"VirtualMachine"))))}l.isMDXComponent=!0},162:function(e,r,t){"use strict";t.d(r,"a",(function(){return s})),t.d(r,"b",(function(){return d}));var n=t(0),a=t.n(n);function o(e,r,t){return r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}function c(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);r&&(n=n.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),t.push.apply(t,n)}return t}function u(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?c(Object(t),!0).forEach((function(r){o(e,r,t[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):c(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))}))}return e}function i(e,r){if(null==e)return{};var t,n,a=function(e,r){if(null==e)return{};var t,n,a={},o=Object.keys(e);for(n=0;n<o.length;n++)t=o[n],r.indexOf(t)>=0||(a[t]=e[t]);return a}(e,r);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)t=o[n],r.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(a[t]=e[t])}return a}var l=a.a.createContext({}),p=function(e){var r=a.a.useContext(l),t=r;return e&&(t="function"==typeof e?e(r):u(u({},r),e)),t},s=function(e){var r=p(e.components);return a.a.createElement(l.Provider,{value:r},e.children)},b={inlineCode:"code",wrapper:function(e){var r=e.children;return a.a.createElement(a.a.Fragment,{},r)}},m=a.a.forwardRef((function(e,r){var t=e.components,n=e.mdxType,o=e.originalType,c=e.parentName,l=i(e,["components","mdxType","originalType","parentName"]),s=p(t),m=n,d=s["".concat(c,".").concat(m)]||s[m]||b[m]||o;return t?a.a.createElement(d,u(u({ref:r},l),{},{components:t})):a.a.createElement(d,u({ref:r},l))}));function d(e,r){var t=arguments,n=r&&r.mdxType;if("string"==typeof e||n){var o=t.length,c=new Array(o);c[0]=m;var u={};for(var i in r)hasOwnProperty.call(r,i)&&(u[i]=r[i]);u.originalType=e,u.mdxType="string"==typeof e?e:n,c[1]=u;for(var l=2;l<o;l++)c[l]=t[l];return a.a.createElement.apply(null,c)}return a.a.createElement.apply(null,t)}m.displayName="MDXCreateElement"}}]);