"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[645],{3905:(e,t,r)=>{r.d(t,{Zo:()=>p,kt:()=>b});var n=r(67294);function i(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function o(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function a(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?o(Object(r),!0).forEach((function(t){i(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function l(e,t){if(null==e)return{};var r,n,i=function(e,t){if(null==e)return{};var r,n,i={},o=Object.keys(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||(i[r]=e[r]);return i}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(i[r]=e[r])}return i}var s=n.createContext({}),c=function(e){var t=n.useContext(s),r=t;return e&&(r="function"==typeof e?e(t):a(a({},t),e)),r},p=function(e){var t=c(e.components);return n.createElement(s.Provider,{value:t},e.children)},u="mdxType",m={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},f=n.forwardRef((function(e,t){var r=e.components,i=e.mdxType,o=e.originalType,s=e.parentName,p=l(e,["components","mdxType","originalType","parentName"]),u=c(r),f=i,b=u["".concat(s,".").concat(f)]||u[f]||m[f]||o;return r?n.createElement(b,a(a({ref:t},p),{},{components:r})):n.createElement(b,a({ref:t},p))}));function b(e,t){var r=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var o=r.length,a=new Array(o);a[0]=f;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l[u]="string"==typeof e?e:i,a[1]=l;for(var c=2;c<o;c++)a[c]=r[c];return n.createElement.apply(null,a)}return n.createElement.apply(null,r)}f.displayName="MDXCreateElement"},42875:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>s,contentTitle:()=>a,default:()=>m,frontMatter:()=>o,metadata:()=>l,toc:()=>c});var n=r(87462),i=(r(67294),r(3905));const o={sidebar_position:2,title:"Concepts"},a="Concepts",l={unversionedId:"Concepts",id:"Concepts",title:"Concepts",description:"Filters",source:"@site/docs/Concepts.md",sourceDirName:".",slug:"/Concepts",permalink:"/rbx-baseline/docs/Concepts",draft:!1,editUrl:"https://github.com/Fizzyhex/rbx-baseline/edit/main/docs/Concepts.md",tags:[],version:"current",sidebarPosition:2,frontMatter:{sidebar_position:2,title:"Concepts"},sidebar:"defaultSidebar",previous:{title:"Introduction",permalink:"/rbx-baseline/docs/intro"},next:{title:"Installation",permalink:"/rbx-baseline/docs/Installation"}},s={},c=[{value:"Filters",id:"filters",level:2},{value:"What are Filters?",id:"what-are-filters",level:3},{value:"Making more reusable filters",id:"making-more-reusable-filters",level:3},{value:"Roblox Instance Filters",id:"roblox-instance-filters",level:3}],p={toc:c},u="wrapper";function m(e){let{components:t,...r}=e;return(0,i.kt)(u,(0,n.Z)({},p,r,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"concepts"},"Concepts"),(0,i.kt)("h2",{id:"filters"},"Filters"),(0,i.kt)("h3",{id:"what-are-filters"},"What are Filters?"),(0,i.kt)("p",null,"Filters are simply functions that return true or false, very similarly to the filters in ",(0,i.kt)("a",{parentName:"p",href:"https://sleitnick.github.io/RbxUtil/api/TableUtil"},"Sleitnick's TableUtil")," for example."),(0,i.kt)("admonition",{type:"info"},(0,i.kt)("p",{parentName:"admonition"},"TableUtil works great in conjunction with Baseline. They both use the same syntax for filters, which makes filters written for both cross compatible.")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-lua"},"local function IsOverFive(x: number)\n    return x > 5\nend\n\nlocal filteredNumbers = Baseline.Filter({3, 5, 6, 7, 8}, IsOverFive)\n-- { 6, 7, 8 }\nprint(filteredNumbers)\n")),(0,i.kt)("h3",{id:"making-more-reusable-filters"},"Making more reusable filters"),(0,i.kt)("p",null,"Here's where the decorator pattern comes in to play. Say we want to take the above ",(0,i.kt)("inlineCode",{parentName:"p"},"IsOverFive")," filter, and make it work with a broader range of numbers. We can achieve this using a decorator:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-lua"},"local function IsOverFilterDecorator(min: number)\n    return function(x: number)\n        return x > min\n    end\nend\n\nlocal isOverFive = IsOverFilterDecorator(5)\nlocal isOverTwenty = IsOverFilterDecorator(20)\n\n-- { 6, 7 }\nprint(Baseline.Filter({3, 4, 5, 6, 7}, isOverFive))\n\n-- { 21, 22, 23 }\nprint(Baseline.Filter({19, 20, 21, 22, 23}, isOverTwenty))\n")),(0,i.kt)("h3",{id:"roblox-instance-filters"},"Roblox Instance Filters"),(0,i.kt)("p",null,"Baseline comes with a bunch of useful filters for Roblox Instances by default. Check the API docs if you're interested in learning about all of those."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-lua"},'local ZombiesContainer = ServerStorage.Zombies:GetChildren()\nlocal zombieFilter = Baseline.CombineFilters(\n    Baseline.Filters.HasTag("Zombie"),\n    Baseline.Filters.IsA("Model")\n)\n\n-- { FastZombie, ZombifiedCitizen, FireZombie, Zombie }\nprint(Baseline.Filter(zombies, zombieFilter))\n')))}m.isMDXComponent=!0}}]);