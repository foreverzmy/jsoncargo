---
pageType: doc
---

# Install

```npm
npm install jsoncargo
```


# Introduction

The `jsoncargo` package provides a versatile set of tools designed to interact with and manipulate JSON objects. It aims to simplify various operations involving JSON data, making it easier for developers to work with complex JSON structures. Here are some key features and functionalities included in the package:

1. **Path-Based Access and Manipulation**: `jsoncargo` allows users to access, modify, and delete values within a JSON object using path-based syntax. This makes it straightforward to navigate through nested structures.

2. **Schema Retrieval**: The `getSchemaByPath` function enables users to retrieve the schema of a specific path within a JSON object. This is particularly useful for understanding the structure and types of data expected at various points within a JSON document.

3. **Dynamic Value Setting**: The package supports dynamic setting of values within JSON objects, allowing for flexible and programmatic updates to the data.

4. **Change Watching**: `jsoncargo` includes functionality to watch for changes within a JSON object, making it easier to track and respond to modifications in real-time.

5. **Validation and Type Checking**: The tools provide built-in validation and type checking to ensure data integrity and consistency throughout the manipulation process.

6. **Utility Functions**: A variety of utility functions are included to perform common operations such as deep cloning, merging, and comparing JSON objects.

`jsoncargo` is designed to be lightweight and easy to integrate into existing projects, providing a robust solution for developers who frequently work with JSON data. The package is available on npm and can be easily installed and utilized within any JavaScript or TypeScript project.
