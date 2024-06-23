---
pageType: doc
---

# jsonMergePatch

An implementation of the JSON Merge Patch [RFC 7396](https://datatracker.ietf.org/doc/html/rfc7396).

JSON Merge Patch (RFC 7396) is a standard format that allows you to update a JSON document by sending the changes rather than the whole document. JSON Merge Patch plays well with the HTTP PATCH verb (method) and REST style programming.

There are three functions (`merge`, `apply`, and `generate`) for manipulating JSON objects. These functions are used for applying patches to JSON objects, merging JSON objects, and generating patches based on differences between JSON objects.

## `jsonMergePatch.merge`

Merges a patch JSON object into an original JSON object. If either the original or the patch is not a valid JSON object, it returns a deep clone of the patch.

### Types

* `Json`: Represents any valid JSON value.

### Function Signature

```ts
const merge: (original: Json, patch: Json) => Json
```

### Parameters

* `original`: The original JSON object to be merged.
* `patch`: The patch JSON object to merge into the original.

### Return Value

* Returns the `Json` object that is the merged result.

### Usage

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

## `jsonMergePatch.apply`

Applies a patch to a target JSON object. If the patch or the target is not a valid JSON object, the target is replaced with a deep clone of the patch.

### Types

* `Json`: Represents any valid JSON value.

### Function Signature

```ts
const apply: (target: Json, patch: Json) => Json
```

### Parameters

* `target`: The target JSON object to which the patch will be applied.
* `patch`: The patch JSON object to apply to the target.

### Return Value

* Return the updated JSON object after applying the patch.

### Usage

```ts
import { jsonMergePatch } from 'jsoncargo';

const target = { a: 1, b: 2 };
const patch = { b: null, c: 3 };

const result = jsonMergePatch.apply(target, patch);

console.log(target); // Output: { a: 1, c: 3 }
console.log(result); // Output: { a: 1, c: 3 }
console.log(target === result); // Output: true
```

## `jsonMergePatch.generate`

Generates a patch JSON object that represents the differences between the original and result JSON objects. If either the original or the result is not a valid JSON object, it returns a deep clone of the result.

### Types

* `Json`: Represents any valid JSON value.

### Function Signature

```ts
const generate: (original: Json, result: Json) => Json
```

### Parameters

* `original`: The original JSON object.
* `result`: The resulting JSON object to compare with the original.

### Return Value

* Return the generated patch JSON object.

### Usage

```ts
import { jsonMergePatch } from 'jsoncargo';

const original = { a: 1, b: 2 };
const result = { a: 1, c: 3 };

const patch = jsonMergePatch.generate(original, result);

console.log(patch); // Output: { b: null, c: 3 }
```