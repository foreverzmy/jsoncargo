# jsoncargo

* [getSchemaByPath](#getSchemaByPath)
* [getDeltaByPath](#getDeltaByPath)

## getSchemaByPath

The `getSchemaByPath` function is designed to navigate through a JSON Schema and retrieve the schema definition at a specified path. This utility is particularly useful in applications that need to validate or process nested structures within a JSON object based on its schema.

### Types

* `Json`: Represents any valid JSON value.
* `JsonType`: Enumerates the possible JSON types.
* `JsonSchemaType`: Extends `JsonType` with an additional 'integer' type for more precise schema definitions.
* `JsonSchema`: Represents a JSON Schema with various properties that define validation rules.

### Function Signature

```ts
function getSchemaByPath(schema: JsonSchema, path: string | string[]): JsonSchema | undefined;
```

### Parameters

* `schema`: The root JSON Schema object from which the path traversal begins.
* `path`: A string or array of strings representing the path to traverse within the JSON Schema. Paths are dot-separated for string input.

### Return Value

* Returns the `JsonSchema` object located at the specified path within the input schema.
* If the path does not exist or the traversal fails, `undefined` is returned.

### Usage

#### Object Schema Navigation

When navigating an object schema, `getSchemaByPath` follows the `properties`, `patternProperties`, `additionalProperties`, and `unevaluatedProperties` keys to find the nested schema.

For example:

* Given a path `user.name`, it will attempt to find the schema for the `name` property within the `user` object.
* If `name` matches a pattern in `patternProperties`, that schema will be returned.

#### Array Schema Navigation

For array schemas, the function handles both indexed and unindexed items:

* Paths that are numeric (or numeric strings) will attempt to find the schema for the item at that index in the `items` array.
* If the index is out of bounds or the `items` is a single schema object, `additionalItems` schema is considered.

### Example

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

### Conclusion

The `getSchemaByPath` function is a powerful tool for dynamically accessing nested schemas within a larger JSON Schema structure, enabling developers to implement complex validation and processing logic based on schema definitions.

## getDeltaByPath

The `getDeltaByPath` method is part of a [jsondiffpatch](https://github.com/benjamine/jsondiffpatch/tree/master) utility designed to extract a specific delta (change set) from a larger delta object representing differences between two JSON objects. This method is useful for retrieving precise change information at a given path within the JSON structure.

### Delta Types

* `AddedDelta`: Represents an added value.
* `ModifiedDelta`: Represents a change from one value to another.
* `DeletedDelta`: Represents a deleted value.
* `ObjectDelta`: A complex object structure representing changes in a nested JSON object.
* `ArrayDelta`: Represents changes in an array, including additions, deletions, and modifications.
* `MovedDelta`: Represents a moved value within an array.
* `TextDiffDelta`: Represents a textual difference.

### Function Signature

```ts
function getDeltaByPath(delta: Delta, path: string | string[]): Delta;
```

### Parameters

* `delta`: The root delta object from which changes are extracted.
* `path`: The path to the specific change within the delta object. It can be a string or an array of strings representing the path to the desired change.
  
### Return Value

Returns a Delta object representing the change at the specified path. If no change exists at that path or the path is invalid, the function returns undefined.

### Usage
To use the `getDeltaByPath` function, you need to pass the complete delta object and the path to the specific change you want to retrieve. The path can be a dot-separated string (e.g., `"user.name"`) or an array of strings representing the keys and indexes in the path (e.g., `["user", "name"]`).

### Example

```ts
import * as jsondiffpatch from 'jsondiffpatch';
import { getDeltaByPath } from 'jsoncargo';

const country = {
  name: 'Argentina',
  capital: 'Buenos Aires',
  independence: new Date(1816, 6, 9),
  unasur: true,
};

const country2 = JSON.parse(JSON.stringify(country), jsondiffpatch.dateReviver);

// make some changes
country2.name = 'Republica Argentina';
country2.population = 41324992;
delete country2.capital;

const delta = jsondiffpatch.diff(country, country2);

console.log(getDeltaByPath(delta, 'name'));         // ['Argentina', 'Republica Argentina']
console.log(getDeltaByPath(delta, 'population'));   //  [41324992]
console.log(getDeltaByPath(delta, 'capital'));      // ['Buenos Aires', 0, 0]
console.log(getDeltaByPath(delta, 'independence')); // undefined
console.log(getDeltaByPath(delta, 'unasur'));       // undefined
```

### Notes

* The function handles different types of deltas and navigates through the nested structure based on the provided path.
* For `ArrayDelta` and `ObjectDelta`, the function recursively searches for the specified path.
* For simple deltas like `AddedDelta`, `ModifiedDelta`, and `DeletedDelta`, it directly returns the corresponding change if it matches the path.

### Conclusion

The `getDeltaByPath` method is a powerful tool for navigating complex delta objects and extracting specific changes, making it easier to understand and handle the differences between JSON objects in a fine-grained manner.
