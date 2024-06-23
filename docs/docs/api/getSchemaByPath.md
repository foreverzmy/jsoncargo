---
pageType: doc
---

# getSchemaByPath

The `getSchemaByPath` function is designed to navigate through a JSON Schema and retrieve the schema definition at a specified path. This utility is particularly useful in applications that need to validate or process nested structures within a JSON object based on its schema.

## Types

* `Json`: Represents any valid JSON value.
* `JsonType`: Enumerates the possible JSON types.
* `JsonSchemaType`: Extends `JsonType` with an additional 'integer' type for more precise schema definitions.
* `JsonSchema`: Represents a JSON Schema with various properties that define validation rules.

## Function Signature

```ts
const getSchemaByPath: (schema: JsonSchema, path: string | string[]) => JsonSchema | undefined
```

## Parameters

* `schema`: The root JSON Schema object from which the path traversal begins.
* `path`: A string or array of strings representing the path to traverse within the JSON Schema. Paths are dot-separated for string input.

## Return Value

* Returns the `JsonSchema` object located at the specified path within the input schema.
* If the path does not exist or the traversal fails, `undefined` is returned.

## Usage

### Object Schema Navigation

When navigating an object schema, `getSchemaByPath` follows the `properties`, `patternProperties`, `additionalProperties`, and `unevaluatedProperties` keys to find the nested schema.

For example:

* Given a path `user.name`, it will attempt to find the schema for the `name` property within the `user` object.
* If `name` matches a pattern in `patternProperties`, that schema will be returned.

### Array Schema Navigation

For array schemas, the function handles both indexed and unindexed items:

* Paths that are numeric (or numeric strings) will attempt to find the schema for the item at that index in the `items` array.
* If the index is out of bounds or the `items` is a single schema object, `additionalItems` schema is considered.

## Example

```ts
import { getSchemaByPath } from 'jsoncargo';

const schema: JsonSchema = {
  type: 'object',
  properties: {
    user: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        age: { type: 'integer' }
      }
    }
  }
};

const result = getSchemaByPath(schema, 'user.name');
// result would be { type: 'string' }
```

In this example, `getSchemaByPath` retrieves the schema for the `name` property within the `user` object, returning `{ type: "string" }`.

## Conclusion

The `getSchemaByPath` function is a powerful tool for dynamically accessing nested schemas within a larger JSON Schema structure, enabling developers to implement complex validation and processing logic based on schema definitions.
