"use strict";(self.webpackChunkrspress_doc_template=self.webpackChunkrspress_doc_template||[]).push([["160"],{5777:function(e,n,a){a.r(n);var s=a(5893),t=a(65);function i(e){let n=Object.assign({h1:"h1",a:"a",p:"p",code:"code",h2:"h2",ul:"ul",li:"li",pre:"pre",h3:"h3"},(0,t.ah)(),e.components);return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsxs)(n.h1,{id:"getschemabypath",children:["getSchemaByPath",(0,s.jsx)(n.a,{className:"header-anchor","aria-hidden":"true",href:"#getschemabypath",children:"#"})]}),"\n",(0,s.jsxs)(n.p,{children:["The ",(0,s.jsx)(n.code,{children:"getSchemaByPath"})," function is designed to navigate through a JSON Schema and retrieve the schema definition at a specified path. This utility is particularly useful in applications that need to validate or process nested structures within a JSON object based on its schema."]}),"\n",(0,s.jsxs)(n.h2,{id:"types",children:["Types",(0,s.jsx)(n.a,{className:"header-anchor","aria-hidden":"true",href:"#types",children:"#"})]}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.code,{children:"Json"}),": Represents any valid JSON value."]}),"\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.code,{children:"JsonType"}),": Enumerates the possible JSON types."]}),"\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.code,{children:"JsonSchemaType"}),": Extends ",(0,s.jsx)(n.code,{children:"JsonType"})," with an additional 'integer' type for more precise schema definitions."]}),"\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.code,{children:"JsonSchema"}),": Represents a JSON Schema with various properties that define validation rules."]}),"\n"]}),"\n",(0,s.jsxs)(n.h2,{id:"function-signature",children:["Function Signature",(0,s.jsx)(n.a,{className:"header-anchor","aria-hidden":"true",href:"#function-signature",children:"#"})]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-ts",children:"const getSchemaByPath: (schema: JsonSchema, path: string | string[]) => JsonSchema | undefined\n"})}),"\n",(0,s.jsxs)(n.h2,{id:"parameters",children:["Parameters",(0,s.jsx)(n.a,{className:"header-anchor","aria-hidden":"true",href:"#parameters",children:"#"})]}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.code,{children:"schema"}),": The root JSON Schema object from which the path traversal begins."]}),"\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.code,{children:"path"}),": A string or array of strings representing the path to traverse within the JSON Schema. Paths are dot-separated for string input."]}),"\n"]}),"\n",(0,s.jsxs)(n.h2,{id:"return-value",children:["Return Value",(0,s.jsx)(n.a,{className:"header-anchor","aria-hidden":"true",href:"#return-value",children:"#"})]}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:["Returns the ",(0,s.jsx)(n.code,{children:"JsonSchema"})," object located at the specified path within the input schema."]}),"\n",(0,s.jsxs)(n.li,{children:["If the path does not exist or the traversal fails, ",(0,s.jsx)(n.code,{children:"undefined"})," is returned."]}),"\n"]}),"\n",(0,s.jsxs)(n.h2,{id:"usage",children:["Usage",(0,s.jsx)(n.a,{className:"header-anchor","aria-hidden":"true",href:"#usage",children:"#"})]}),"\n",(0,s.jsxs)(n.h3,{id:"object-schema-navigation",children:["Object Schema Navigation",(0,s.jsx)(n.a,{className:"header-anchor","aria-hidden":"true",href:"#object-schema-navigation",children:"#"})]}),"\n",(0,s.jsxs)(n.p,{children:["When navigating an object schema, ",(0,s.jsx)(n.code,{children:"getSchemaByPath"})," follows the ",(0,s.jsx)(n.code,{children:"properties"}),", ",(0,s.jsx)(n.code,{children:"patternProperties"}),", ",(0,s.jsx)(n.code,{children:"additionalProperties"}),", and ",(0,s.jsx)(n.code,{children:"unevaluatedProperties"})," keys to find the nested schema."]}),"\n",(0,s.jsx)(n.p,{children:"For example:"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:["Given a path ",(0,s.jsx)(n.code,{children:"user.name"}),", it will attempt to find the schema for the ",(0,s.jsx)(n.code,{children:"name"})," property within the ",(0,s.jsx)(n.code,{children:"user"})," object."]}),"\n",(0,s.jsxs)(n.li,{children:["If ",(0,s.jsx)(n.code,{children:"name"})," matches a pattern in ",(0,s.jsx)(n.code,{children:"patternProperties"}),", that schema will be returned."]}),"\n"]}),"\n",(0,s.jsxs)(n.h3,{id:"array-schema-navigation",children:["Array Schema Navigation",(0,s.jsx)(n.a,{className:"header-anchor","aria-hidden":"true",href:"#array-schema-navigation",children:"#"})]}),"\n",(0,s.jsx)(n.p,{children:"For array schemas, the function handles both indexed and unindexed items:"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:["Paths that are numeric (or numeric strings) will attempt to find the schema for the item at that index in the ",(0,s.jsx)(n.code,{children:"items"})," array."]}),"\n",(0,s.jsxs)(n.li,{children:["If the index is out of bounds or the ",(0,s.jsx)(n.code,{children:"items"})," is a single schema object, ",(0,s.jsx)(n.code,{children:"additionalItems"})," schema is considered."]}),"\n"]}),"\n",(0,s.jsxs)(n.h2,{id:"example",children:["Example",(0,s.jsx)(n.a,{className:"header-anchor","aria-hidden":"true",href:"#example",children:"#"})]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-ts",children:"import { getSchemaByPath } from 'jsoncargo';\n\nconst schema: JsonSchema = {\n  type: 'object',\n  properties: {\n    user: {\n      type: 'object',\n      properties: {\n        name: { type: 'string' },\n        age: { type: 'integer' }\n      }\n    }\n  }\n};\n\nconst result = getSchemaByPath(schema, 'user.name');\n// result would be { type: 'string' }\n"})}),"\n",(0,s.jsxs)(n.p,{children:["In this example, ",(0,s.jsx)(n.code,{children:"getSchemaByPath"})," retrieves the schema for the ",(0,s.jsx)(n.code,{children:"name"})," property within the ",(0,s.jsx)(n.code,{children:"user"})," object, returning ",(0,s.jsx)(n.code,{children:'{ type: "string" }'}),"."]}),"\n",(0,s.jsxs)(n.h2,{id:"conclusion",children:["Conclusion",(0,s.jsx)(n.a,{className:"header-anchor","aria-hidden":"true",href:"#conclusion",children:"#"})]}),"\n",(0,s.jsxs)(n.p,{children:["The ",(0,s.jsx)(n.code,{children:"getSchemaByPath"})," function is a powerful tool for dynamically accessing nested schemas within a larger JSON Schema structure, enabling developers to implement complex validation and processing logic based on schema definitions."]})]})}function r(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},{wrapper:n}=Object.assign({},(0,t.ah)(),e.components);return n?(0,s.jsx)(n,{...e,children:(0,s.jsx)(i,{...e})}):i(e)}n.default=r,r.__RSPRESS_PAGE_META={},r.__RSPRESS_PAGE_META["api%2FgetSchemaByPath.md"]={toc:[{text:"Types",id:"types",depth:2},{text:"Function Signature",id:"function-signature",depth:2},{text:"Parameters",id:"parameters",depth:2},{text:"Return Value",id:"return-value",depth:2},{text:"Usage",id:"usage",depth:2},{text:"Object Schema Navigation",id:"object-schema-navigation",depth:3},{text:"Array Schema Navigation",id:"array-schema-navigation",depth:3},{text:"Example",id:"example",depth:2},{text:"Conclusion",id:"conclusion",depth:2}],title:"getSchemaByPath",frontmatter:{pageType:"doc"}}}}]);