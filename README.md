# jsoncargo

* [getSchemaByPath](#getSchemaByPath)
* [getDeltaByPath](#getDeltaByPath)
* [getDeltaType](#getDeltaType)
* [jsonMergePatch](#jsonMergePatch)
* [ObservableObject](#ObservableObject)

## getSchemaByPath

The `getSchemaByPath` function is designed to navigate through a JSON Schema and retrieve the schema definition at a specified path. This utility is particularly useful in applications that need to validate or process nested structures within a JSON object based on its schema.

### Types

* `Json`: Represents any valid JSON value.
* `JsonType`: Enumerates the possible JSON types.
* `JsonSchemaType`: Extends `JsonType` with an additional 'integer' type for more precise schema definitions.
* `JsonSchema`: Represents a JSON Schema with various properties that define validation rules.

### Function Signature

```ts
const getSchemaByPath: (schema: JsonSchema, path: string | string[]) => JsonSchema | undefined
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

The `getDeltaByPath` method is a tool of [jsondiffpatch](https://github.com/benjamine/jsondiffpatch/tree/master) utility designed to extract a specific delta (change set) from a larger delta object representing differences between two JSON objects. This method is useful for retrieving precise change information at a given path within the JSON structure.

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
const getDeltaByPath: (delta: Delta, path: string | string[]) => Delta
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

## getDeltaType

The `getDeltaType` method is a tool of [jsondiffpatch](https://github.com/benjamine/jsondiffpatch/tree/master) that generates a delta object representing the difference between two JSON values. This method analyzes a delta object to determine the type of change it represents. The delta types include added, deleted, modified, unchanged, and unknown.

### Function Signature

```ts
const getDeltaType: (delta: Delta, path?: string | string[], options?: GetDeltaTypeOptions) => DELTA_TYPE
```

### Parameters

* `delta`: The delta object to inspect.
* `path`: An optional path (string or array of strings) to a specific part of the delta object.
* `options`: An optional object with the following properties:
  * `deep`: A boolean indicating whether to inspect deeply into nested objects and arrays.

### Return Value

The function returns a value from the `DELTA_TYPE` enum, indicating the type of change detected:

```ts
export enum DELTA_TYPE {
  ADDED = 'added',
  DELETED = 'deleted',
  MODIFIED = 'modified',
  UNCHANGED = 'unchanged',
  UNKNOWN = 'unknown',
}
```

### Usage

```ts
import { type DELTA_TYPE, type Delta, getDeltaType } from 'jsoncargo';

const delta: Delta = // your delta object here;
const path: string | string[] = // optional path to inspect within the delta;

const options = {
  deep: true // optional, set to true to inspect deeply in the object structure
};

const type = getDeltaType(delta, path, options);
console.log(type); // outputs the DELTA_TYPE of the change at the specified path
```

### Notes

The method handles different structures of delta objects, including arrays and objects, and interprets them according to the specified path and options.

The `deep` option allows for detailed inspection of nested structures within the delta object, providing flexibility in how changes are detected and classified.

## jsonMergePatch

An implementation of the JSON Merge Patch [RFC 7396](https://datatracker.ietf.org/doc/html/rfc7396).

JSON Merge Patch (RFC 7396) is a standard format that allows you to update a JSON document by sending the changes rather than the whole document. JSON Merge Patch plays well with the HTTP PATCH verb (method) and REST style programming.

There are three functions (`merge`, `apply`, and `generate`) for manipulating JSON objects. These functions are used for applying patches to JSON objects, merging JSON objects, and generating patches based on differences between JSON objects.

### `jsonMergePatch.merge`

Merges a patch JSON object into an original JSON object. If either the original or the patch is not a valid JSON object, it returns a deep clone of the patch.

#### Types

* `Json`: Represents any valid JSON value.

#### Function Signature

```ts
const merge: (original: Json, patch: Json) => Json
```

#### Parameters

* `original`: The original JSON object to be merged.
* `patch`: The patch JSON object to merge into the original.

#### Return Value

* Returns the `Json` object that is the merged result.

#### Usage

```ts
import { jsonMergePatch } from 'jsoncargo';

const original = { a: 1, b: 2 };
const patch1 = { b: 3, c: 4 };
const patch2 = { a: null };

const result1 = jsonMergePatch.merge(original, patch1);
console.log(result1); // Output: { a: 1, b: 3, c: 4 }

const result2 = jsonMergePatch.merge(result1, patch2);
console.log(result2); // Output: { b: 3, c: 4 }
```

### `jsonMergePatch.apply`

Applies a patch to a target JSON object. If the patch or the target is not a valid JSON object, the target is replaced with a deep clone of the patch.

#### Types

* `Json`: Represents any valid JSON value.

#### Function Signature

```ts
const apply: (target: Json, patch: Json) => Json
```

#### Parameters

* `target`: The target JSON object to which the patch will be applied.
* `patch`: The patch JSON object to apply to the target.

#### Return Value

* Return the updated JSON object after applying the patch.

#### Usage

```ts
import { jsonMergePatch } from 'jsoncargo';

const target = { a: 1, b: 2 };
const patch = { b: null, c: 3 };

const result = jsonMergePatch.apply(target, patch);

console.log(target); // Output: { a: 1, c: 3 }
console.log(result); // Output: { a: 1, c: 3 }
console.log(target === result); // Output: true
```


### `jsonMergePatch.generate`

Generates a patch JSON object that represents the differences between the original and result JSON objects. If either the original or the result is not a valid JSON object, it returns a deep clone of the result.

#### Types

* `Json`: Represents any valid JSON value.

#### Function Signature

```ts
const generate: (original: Json, result: Json) => Json
```

#### Parameters

* `original`: The original JSON object.
* `result`: The resulting JSON object to compare with the original.

#### Return Value

* Return the generated patch JSON object.

#### Usage

```ts
import { jsonMergePatch } from 'jsoncargo';

const original = { a: 1, b: 2 };
const result = { a: 1, c: 3 };

const patch = jsonMergePatch.generate(original, result);

console.log(patch); // Output: { b: null, c: 3 }
```

## ObservableObject

The `ObservableObject` class provides a mechanism to observe changes to the properties of an object. It allows setting values on the object and watching for changes at specific paths, including nested properties, making it suitable for complex state management scenarios.

### Class Definition

#### Constructor

Creates a new `ObservableObject` instance.

```ts
constructor(target: T)
```

* `target`: The initial object to observe. This object is **deeply cloned** to avoid direct mutations.

#### Properties

* `value`: Returns a **deep clone** of the target object.

#### Methods

##### `set`

Sets a value at a specific path within the object and notifies watchers if the value changes.

```ts
type PropertyPath = Many<PropertyName>;
type Many<T> = T | readonly T[];
type PropertyName = string | number | symbol;

set<V = any>(path: PropertyPath, value: V): V;
```

* `path`: The path where the value should be set (can be a string or an array of strings).
* `value`: The new value to set at the specified path.

Returns the new value at the specified path.

##### `get`

Gets the value at a specific path or the entire object if no path is provided.

```ts
get(): T;
get<V>(path: PropertyPath): V;
```

* `path` (optional): The path to retrieve the value from (can be a string or an array of strings).

Returns the **deep clone value** at the specified path or a **deep clone** of the entire object if no path is provided.

##### `watch`

Watches for changes at a specific path and executes a callback when changes occur.

```ts
interface WatchOptions {
 leading?: boolean;
}

type WatchCallback = (value: any) => void;

type OffWatch = () => void;

watch(path: PropertyPath, callback: WatchCallback, options?: WatchOptions): OffWatch;
```

* `path`: The path to watch for changes.
* `callback`: The function to execute when a change occurs.
* `options` (optional): An object with the following optional properties:
  * `leading`: If true, the callback is executed immediately with the current value at the path.

Returns a function to unsubscribe from the watch.

### Usage

#### Creating an ObservableObject

```ts
const obj = {
  user: {
    name: 'Alice',
    age: 25
  },
  items: ['item1', 'item2']
};

const observable = new ObservableObject(obj);

```

#### Getting Values

```ts
console.log(observable.get()); // Returns the entire object
console.log(observable.get('user.name')); // Returns 'Alice'
```

#### Setting Values

```ts
observable.set('user.age', 26);
console.log(observable.get('user.age')); // Returns 26
```

> Note: If the value being set is equal to the existing value, watchers will not be triggered.

#### Watching for Changes

```ts
const unsubscribe = observable.watch('user.age', (newValue) => {
  console.log('User age changed to:', newValue);
}, { leading: true });

observable.set('user.age', 27); // Logs: 'User age changed to: 27'

// To unsubscribe from watching
unsubscribe();
```

#### Watching Nested Properties

```ts
observable.watch('user', (newValue) => {
  console.log('User object changed:', newValue);
});

observable.set('user.name', 'Bob'); // Logs: 'User object changed: { name: 'Bob', age: 27 }'
```

### Advanced Usage

#### Root Watcher

To watch for any change in the object:

```ts
observable.watch('*', (newValue) => {
  console.log('Object changed:', newValue);
});
```

#### Watching Parent and Child Paths

The `ObservableObject` automatically detects changes to parent and child paths. If a parent path is watched, any change to a child path will trigger the callback.

```ts
observable.watch('user', (newValue) => {
  console.log('User object changed:', newValue);
});

observable.set('user.name', 'Charlie'); // Logs: 'User object changed: { name: 'Charlie', age: 27 }'
observable.set('user.name', 'Charlie'); // No watch, auto
```

