---
pageType: doc
---

# getDeltaType

The `getDeltaType` method is a tool of [jsondiffpatch](https://github.com/benjamine/jsondiffpatch/tree/master) that generates a delta object representing the difference between two JSON values. This method analyzes a delta object to determine the type of change it represents. The delta types include added, deleted, modified, unchanged, and unknown.

## Function Signature

```ts
const getDeltaType: (delta: Delta, path?: string | string[], options?: GetDeltaTypeOptions) => DELTA_TYPE
```

## Parameters

* `delta`: The delta object to inspect.
* `path`: An optional path (string or array of strings) to a specific part of the delta object.
* `options`: An optional object with the following properties:
  * `deep`: A boolean indicating whether to inspect deeply into nested objects and arrays.

## Return Value

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

## Usage

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

## Notes

The method handles different structures of delta objects, including arrays and objects, and interprets them according to the specified path and options.

The `deep` option allows for detailed inspection of nested structures within the delta object, providing flexibility in how changes are detected and classified.
