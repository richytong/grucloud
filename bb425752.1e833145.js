(window.webpackJsonp=window.webpackJsonp||[]).push([[44],{145:function(e,t,r){"use strict";r.r(t),r.d(t,"frontMatter",(function(){return o})),r.d(t,"metadata",(function(){return a})),r.d(t,"rightToc",(function(){return l})),r.d(t,"default",(function(){return u}));var n=r(2),c=(r(0),r(162));const o={id:"Project",title:"Project"},a={id:"google/resources/Compute/Project",isDocsHomePage:!1,title:"Project",description:"Manages a Project",source:"@site/docs/google/resources/Compute/Project.md",permalink:"/docs/google/resources/Compute/Project"},l=[{value:"Examples",id:"examples",children:[]},{value:"Properties",id:"properties",children:[]},{value:"Used By",id:"used-by",children:[]},{value:"Gcloud CLI",id:"gcloud-cli",children:[]}],i={rightToc:l};function u({components:e,...t}){return Object(c.b)("wrapper",Object(n.a)({},i,t,{components:e,mdxType:"MDXLayout"}),Object(c.b)("p",null,"Manages a ",Object(c.b)("a",Object(n.a)({parentName:"p"},{href:"https://cloud.google.com/resource-manager/reference/rest/v1/projects"}),"Project")),Object(c.b)("pre",null,Object(c.b)("code",Object(n.a)({parentName:"pre"},{className:"language-js"}),'const project = await provider.makeProject({ name: "myproject" });\n')),Object(c.b)("h3",{id:"examples"},"Examples"),Object(c.b)("ul",null,Object(c.b)("li",{parentName:"ul"},Object(c.b)("a",Object(n.a)({parentName:"li"},{href:"https://github.com/grucloud/grucloud/blob/master/examples/google/iac.js"}),"basic example"))),Object(c.b)("h3",{id:"properties"},"Properties"),Object(c.b)("ul",null,Object(c.b)("li",{parentName:"ul"},Object(c.b)("a",Object(n.a)({parentName:"li"},{href:"https://cloud.google.com/resource-manager/reference/rest/v1/projects/create"}),"all properties"))),Object(c.b)("h3",{id:"used-by"},"Used By"),Object(c.b)("ul",null,Object(c.b)("li",{parentName:"ul"},Object(c.b)("a",Object(n.a)({parentName:"li"},{href:"./VmInstance"}),"Vm Instance"))),Object(c.b)("h3",{id:"gcloud-cli"},"Gcloud CLI"),Object(c.b)("pre",null,Object(c.b)("code",Object(n.a)({parentName:"pre"},{}),"gcloud organizations list\n\ngcloud projects list\n")))}u.isMDXComponent=!0},162:function(e,t,r){"use strict";r.d(t,"a",(function(){return s})),r.d(t,"b",(function(){return d}));var n=r(0),c=r.n(n);function o(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function a(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function l(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?a(Object(r),!0).forEach((function(t){o(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):a(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function i(e,t){if(null==e)return{};var r,n,c=function(e,t){if(null==e)return{};var r,n,c={},o=Object.keys(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||(c[r]=e[r]);return c}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(c[r]=e[r])}return c}var u=c.a.createContext({}),p=function(e){var t=c.a.useContext(u),r=t;return e&&(r="function"==typeof e?e(t):l(l({},t),e)),r},s=function(e){var t=p(e.components);return c.a.createElement(u.Provider,{value:t},e.children)},b={inlineCode:"code",wrapper:function(e){var t=e.children;return c.a.createElement(c.a.Fragment,{},t)}},m=c.a.forwardRef((function(e,t){var r=e.components,n=e.mdxType,o=e.originalType,a=e.parentName,u=i(e,["components","mdxType","originalType","parentName"]),s=p(r),m=n,d=s["".concat(a,".").concat(m)]||s[m]||b[m]||o;return r?c.a.createElement(d,l(l({ref:t},u),{},{components:r})):c.a.createElement(d,l({ref:t},u))}));function d(e,t){var r=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var o=r.length,a=new Array(o);a[0]=m;var l={};for(var i in t)hasOwnProperty.call(t,i)&&(l[i]=t[i]);l.originalType=e,l.mdxType="string"==typeof e?e:n,a[1]=l;for(var u=2;u<o;u++)a[u]=r[u];return c.a.createElement.apply(null,a)}return c.a.createElement.apply(null,r)}m.displayName="MDXCreateElement"}}]);