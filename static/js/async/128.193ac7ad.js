"use strict";(self.webpackChunkrspress_doc_template=self.webpackChunkrspress_doc_template||[]).push([["128"],{4756:function(e,n,a){a.r(n);var t=a(5893),s=a(65);function r(e){let n=Object.assign({h1:"h1",a:"a",p:"p",code:"code",h2:"h2",pre:"pre",h3:"h3",ul:"ul",li:"li",strong:"strong",h4:"h4",blockquote:"blockquote"},(0,s.ah)(),e.components);return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsxs)(n.h1,{id:"observableobject",children:["ObservableObject",(0,t.jsx)(n.a,{className:"header-anchor","aria-hidden":"true",href:"#observableobject",children:"#"})]}),"\n",(0,t.jsxs)(n.p,{children:["The ",(0,t.jsx)(n.code,{children:"ObservableObject"})," class provides a mechanism to observe changes to the properties of an object. It allows setting values on the object and watching for changes at specific paths, including nested properties, making it suitable for complex state management scenarios."]}),"\n",(0,t.jsxs)(n.h2,{id:"propertyname",children:["PropertyName",(0,t.jsx)(n.a,{className:"header-anchor","aria-hidden":"true",href:"#propertyname",children:"#"})]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-ts",children:"type PropertyPath = Many<PropertyName>;\ntype Many<T> = T | readonly T[];\ntype PropertyName = string | number | symbol;\n"})}),"\n",(0,t.jsxs)(n.p,{children:[(0,t.jsx)(n.code,{children:"PropertyName"})," refers to the various ways you can specify a property name when using methods that deal with object properties."]}),"\n",(0,t.jsxs)(n.p,{children:["It uses lodash's API internally, so its behavior is consistent with ",(0,t.jsx)(n.a,{href:"https://lodash.com/docs/4.17.15#get",target:"_blank",rel:"noopener noreferrer",children:"lodash.get"})," and ",(0,t.jsx)(n.a,{href:"https://lodash.com/docs/4.17.15#setWith",target:"_blank",rel:"noopener noreferrer",children:"lodash.setWith"})," and ",(0,t.jsx)(n.a,{href:"https://lodash.com/docs/4.17.15#toPath",target:"_blank",rel:"noopener noreferrer",children:"lodash.toPath"})," methods when operating the target objects."]}),"\n",(0,t.jsxs)(n.h2,{id:"class-definition",children:["Class Definition",(0,t.jsx)(n.a,{className:"header-anchor","aria-hidden":"true",href:"#class-definition",children:"#"})]}),"\n",(0,t.jsxs)(n.h3,{id:"constructor",children:["Constructor",(0,t.jsx)(n.a,{className:"header-anchor","aria-hidden":"true",href:"#constructor",children:"#"})]}),"\n",(0,t.jsxs)(n.p,{children:["Creates a new ",(0,t.jsx)(n.code,{children:"ObservableObject"})," instance."]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-ts",children:"constructor(target: T)\n"})}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"target"}),": The initial object to observe. This object is ",(0,t.jsx)(n.strong,{children:"deeply cloned"})," to avoid direct mutations."]}),"\n"]}),"\n",(0,t.jsxs)(n.h3,{id:"properties",children:["Properties",(0,t.jsx)(n.a,{className:"header-anchor","aria-hidden":"true",href:"#properties",children:"#"})]}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"value"}),": Returns a ",(0,t.jsx)(n.strong,{children:"deep clone"})," of the target object."]}),"\n"]}),"\n",(0,t.jsxs)(n.h3,{id:"methods",children:["Methods",(0,t.jsx)(n.a,{className:"header-anchor","aria-hidden":"true",href:"#methods",children:"#"})]}),"\n",(0,t.jsxs)(n.h4,{id:"set",children:[(0,t.jsx)(n.code,{children:"set"}),(0,t.jsx)(n.a,{className:"header-anchor","aria-hidden":"true",href:"#set",children:"#"})]}),"\n",(0,t.jsx)(n.p,{children:"Sets a value at a specific path within the object and notifies watchers if the value changes."}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-ts",children:"\nset<V = any>(path: PropertyPath, value: V, customizer?: (nsValue: any, key: string, nsObject: T) => any): V;\n"})}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"path"}),": The path where the value should be set (can be a string or an array of strings)."]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"value"}),": The new value to set at the specified path."]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"customizer"})," (optional): The function to customize assigned values."]}),"\n"]}),"\n",(0,t.jsx)(n.p,{children:"Returns the new value at the specified path."}),"\n",(0,t.jsxs)(n.h4,{id:"get",children:[(0,t.jsx)(n.code,{children:"get"}),(0,t.jsx)(n.a,{className:"header-anchor","aria-hidden":"true",href:"#get",children:"#"})]}),"\n",(0,t.jsx)(n.p,{children:"Gets the value at a specific path or the entire object if no path is provided."}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-ts",children:"get(): T;\nget<V>(path: PropertyPath): V;\n"})}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"path"})," (optional): The path to retrieve the value from (can be a string or an array of strings)."]}),"\n"]}),"\n",(0,t.jsxs)(n.p,{children:["Returns the ",(0,t.jsx)(n.strong,{children:"deep clone value"})," at the specified path or a ",(0,t.jsx)(n.strong,{children:"deep clone"})," of the entire object if no path is provided."]}),"\n",(0,t.jsxs)(n.h4,{id:"unset",children:[(0,t.jsx)(n.code,{children:"unset"}),(0,t.jsx)(n.a,{className:"header-anchor","aria-hidden":"true",href:"#unset",children:"#"})]}),"\n",(0,t.jsx)(n.p,{children:"Delete the value at a specific path."}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-ts",children:"unset<V = any>(path: PropertyPath): V | undefined;\n"})}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"path"}),": The path to delete."]}),"\n"]}),"\n",(0,t.jsxs)(n.p,{children:["Returns the value at the specified path to delete, if the path not exists, it will be ",(0,t.jsx)(n.code,{children:"undefined"}),"."]}),"\n",(0,t.jsxs)(n.h4,{id:"watch",children:[(0,t.jsx)(n.code,{children:"watch"}),(0,t.jsx)(n.a,{className:"header-anchor","aria-hidden":"true",href:"#watch",children:"#"})]}),"\n",(0,t.jsx)(n.p,{children:"Watches for changes at a specific path and executes a callback when changes occur."}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-ts",children:"interface WatchOptions {\n leading?: boolean;\n}\n\ntype WatchCallback = (value: any) => void;\n\ntype OffWatch = () => void;\n\nwatch(path: PropertyPath, callback: WatchCallback, options?: WatchOptions): OffWatch;\n"})}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"path"}),": The path to watch for changes."]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"callback"}),": The function to execute when a change occurs."]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"options"})," (optional): An object with the following optional properties:","\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"leading"}),": If true, the callback is executed immediately with the current value at the path."]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,t.jsx)(n.p,{children:"Returns a function to unsubscribe from the watch."}),"\n",(0,t.jsxs)(n.h2,{id:"usage",children:["Usage",(0,t.jsx)(n.a,{className:"header-anchor","aria-hidden":"true",href:"#usage",children:"#"})]}),"\n",(0,t.jsxs)(n.h3,{id:"creating-an-observableobject",children:["Creating an ObservableObject",(0,t.jsx)(n.a,{className:"header-anchor","aria-hidden":"true",href:"#creating-an-observableobject",children:"#"})]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-ts",children:"const obj = {\n  user: {\n    name: 'Alice',\n    age: 25\n  },\n  items: ['item1', 'item2']\n};\n\nconst observable = new ObservableObject(obj);\n\n"})}),"\n",(0,t.jsxs)(n.h3,{id:"getting-values",children:["Getting Values",(0,t.jsx)(n.a,{className:"header-anchor","aria-hidden":"true",href:"#getting-values",children:"#"})]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-ts",children:"console.log(observable.get()); // Returns the entire object\nconsole.log(observable.get('user.name')); // Returns 'Alice'\n"})}),"\n",(0,t.jsxs)(n.h3,{id:"setting-values",children:["Setting Values",(0,t.jsx)(n.a,{className:"header-anchor","aria-hidden":"true",href:"#setting-values",children:"#"})]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-ts",children:"observable.set('user.age', 26);\nconsole.log(observable.get('user.age')); // Returns 26\n"})}),"\n",(0,t.jsxs)(n.blockquote,{children:["\n",(0,t.jsx)(n.p,{children:"Note: If the value being set is equal to the existing value, watchers will not be triggered."}),"\n"]}),"\n",(0,t.jsxs)(n.h3,{id:"delete-path-and-value",children:["Delete Path and Value",(0,t.jsx)(n.a,{className:"header-anchor","aria-hidden":"true",href:"#delete-path-and-value",children:"#"})]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-ts",children:"observable.unset('user.age');\nconsole.log(observable.get('user.age')); // Returns undefined\n"})}),"\n",(0,t.jsxs)(n.h3,{id:"watching-for-changes",children:["Watching for Changes",(0,t.jsx)(n.a,{className:"header-anchor","aria-hidden":"true",href:"#watching-for-changes",children:"#"})]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-ts",children:"const unsubscribe = observable.watch('user.age', (newValue) => {\n  console.log('User age changed to:', newValue);\n}, { leading: true });\n\nobservable.set('user.age', 27); // Logs: 'User age changed to: 27'\n\n// To unsubscribe from watching\nunsubscribe();\n"})}),"\n",(0,t.jsxs)(n.h3,{id:"watching-nested-properties",children:["Watching Nested Properties",(0,t.jsx)(n.a,{className:"header-anchor","aria-hidden":"true",href:"#watching-nested-properties",children:"#"})]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-ts",children:"observable.watch('user', (newValue) => {\n  console.log('User object changed:', newValue);\n});\n\nobservable.set('user.name', 'Bob'); // Logs: 'User object changed: { name: 'Bob', age: 27 }'\n"})}),"\n",(0,t.jsxs)(n.h2,{id:"advanced-usage",children:["Advanced Usage",(0,t.jsx)(n.a,{className:"header-anchor","aria-hidden":"true",href:"#advanced-usage",children:"#"})]}),"\n",(0,t.jsxs)(n.h3,{id:"root-watcher",children:["Root Watcher",(0,t.jsx)(n.a,{className:"header-anchor","aria-hidden":"true",href:"#root-watcher",children:"#"})]}),"\n",(0,t.jsx)(n.p,{children:"To watch for any change in the object:"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-ts",children:"observable.watch('*', (newValue) => {\n  console.log('Object changed:', newValue);\n});\n"})}),"\n",(0,t.jsxs)(n.h3,{id:"watching-parent-and-child-paths",children:["Watching Parent and Child Paths",(0,t.jsx)(n.a,{className:"header-anchor","aria-hidden":"true",href:"#watching-parent-and-child-paths",children:"#"})]}),"\n",(0,t.jsxs)(n.p,{children:["The ",(0,t.jsx)(n.code,{children:"ObservableObject"})," automatically detects changes to parent and child paths. If a parent path is watched, any change to a child path will trigger the callback."]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-ts",children:"observable.watch('user', (newValue) => {\n  console.log('User object changed:', newValue);\n});\n\nobservable.set('user.name', 'Charlie'); // Logs: 'User object changed: { name: 'Charlie', age: 27 }'\nobservable.set('user.name', 'Charlie'); // No watch, auto\n"})}),"\n",(0,t.jsxs)(n.h2,{id:"conclusion",children:["Conclusion",(0,t.jsx)(n.a,{className:"header-anchor","aria-hidden":"true",href:"#conclusion",children:"#"})]}),"\n",(0,t.jsxs)(n.p,{children:["The ",(0,t.jsx)(n.code,{children:"ObservableObject"})," class provides a powerful way to manage and react to changes within an object. It supports deep observation of nested properties, making it suitable for complex state management scenarios. Watchers will not be triggered if the new value is equal to the old value, ensuring efficient change detection."]})]})}function h(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},{wrapper:n}=Object.assign({},(0,s.ah)(),e.components);return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(r,{...e})}):r(e)}n.default=h,h.__RSPRESS_PAGE_META={},h.__RSPRESS_PAGE_META["api%2FObservableObject.md"]={toc:[{text:"PropertyName",id:"propertyname",depth:2},{text:"Class Definition",id:"class-definition",depth:2},{text:"Constructor",id:"constructor",depth:3},{text:"Properties",id:"properties",depth:3},{text:"Methods",id:"methods",depth:3},{text:"`set`",id:"set",depth:4},{text:"`get`",id:"get",depth:4},{text:"`unset`",id:"unset",depth:4},{text:"`watch`",id:"watch",depth:4},{text:"Usage",id:"usage",depth:2},{text:"Creating an ObservableObject",id:"creating-an-observableobject",depth:3},{text:"Getting Values",id:"getting-values",depth:3},{text:"Setting Values",id:"setting-values",depth:3},{text:"Delete Path and Value",id:"delete-path-and-value",depth:3},{text:"Watching for Changes",id:"watching-for-changes",depth:3},{text:"Watching Nested Properties",id:"watching-nested-properties",depth:3},{text:"Advanced Usage",id:"advanced-usage",depth:2},{text:"Root Watcher",id:"root-watcher",depth:3},{text:"Watching Parent and Child Paths",id:"watching-parent-and-child-paths",depth:3},{text:"Conclusion",id:"conclusion",depth:2}],title:"ObservableObject",frontmatter:{pageType:"doc"}}}}]);