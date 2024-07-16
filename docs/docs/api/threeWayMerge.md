---
pageType: doc
---

# threeWayMerge

The `threeWayMerge` function performs a three-way merge on two JSON objects (`left` and `right`) with a common ancestor (`base`). It identifies and resolves conflicts between the changes made in the `left` and `right` JSON objects. If conflicts are detected, the method returns the conflict paths; otherwise, it merges the changes and returns the resulting JSON object.

## Types

### PathType

The `PathType` type represents the path to a value within a JSON object or array. It can be either a string (for object keys) or a number (for array indices). This type is used to specify the location of conflicts within the JSON structure.

```ts
type PathType = string | number;
```

### Patch Options

The `patchOptions` object is used to configure the merge behavior for arrays. In this example, `deepPatch` is set to `true` to enable deep patching for arrays.

```ts
const patchOptions = { arrays: { deepPatch: true } };
```

## Function Signature

```ts
const threeWayMerge: (base: Json, left: Json, right: Json) => ThreeWayMergeResult;
```

### Parameters

* `base` (`Json`): The common ancestor JSON object.
* `left` (`Json`): The first JSON object with changes.
* `right` (`Json`): The second JSON object with changes.

### Return Value

The method returns a `ThreeWayMergeResult` object:

* `conflict` (`boolean`): Indicates if there are conflicts.
* `result` (`Json` | `null`): The merged JSON object if no conflicts are found, otherwise `null`.
* `conflicts` (`PathType[][]`): An array of conflict paths if conflicts are found.

## Usage

```ts
import { threeWayMerge } from 'jsoncargo';

const base = { a: 1, b: 2 };
const left = { a: 1, b: 3 };
const right = { a: 1, b: 4 };

const result = threeWayMerge(base, left, right);

if (result.conflict) {
  console.log('Conflicts found:', result.conflicts);
} else {
  console.log('Merged result:', result.result);
}
```

The `threeWayMerge` function helps to merge changes from two JSON objects with a common ancestor. It generates patches for both the `left` and `right` JSON objects based on the `base`, identifies any conflicts between these patches, and merges them if no conflicts are found. The function returns a result indicating whether conflicts were found and, if not, the merged JSON object.

