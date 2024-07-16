import type { Json, JsonArray, JsonObject, PathType } from './types';

function compareObjects(path: PathType[], val1: Json, val2: Json): PathType[][] {
  const conflicts: PathType[][] = [];
  if (val1 === val2) {
    return conflicts;
  }
  if (typeof val1 === 'undefined' || typeof val2 === 'undefined') {
    return conflicts;
  }
  if (typeof val1 !== typeof val2) {
    conflicts.push(path);
    return conflicts;
  }

  if (typeof val1 === 'object' && val1 !== null && val2 !== null) {
    if (Array.isArray(val1) && Array.isArray(val2)) {
      conflicts.push(...compareArrays(path, val1, val2));
    } else if (!Array.isArray(val1) && !Array.isArray(val2)) {
      conflicts.push(...compareJSONObjects(path, val1 as JsonObject, val2 as JsonObject));
    } else {
      conflicts.push(path);
    }
  } else if (val1 !== val2) {
    conflicts.push(path);
  }

  return conflicts;
}

function compareJSONObjects(basePath: PathType[], obj1: JsonObject, obj2: JsonObject) {
  const conflicts: PathType[][] = [];
  const keys = new Set([...Object.keys(obj1), ...Object.keys(obj2)]);
  for (const key of keys) {
    conflicts.push(...compareObjects([...basePath, key], obj1[key], obj2[key]));
  }
  return conflicts;
}

function compareArrays(basePath: PathType[], arr1: JsonArray, arr2: JsonArray) {
  const conflicts: PathType[][] = [];
  if (arr1.includes(null) || arr2.includes(null) || arr1.length !== arr2.length) {
    conflicts.push(basePath);
    return conflicts;
  }
  const maxLength = Math.max(arr1.length, arr2.length);
  for (let i = 0; i < maxLength; i++) {
    conflicts.push(...compareObjects([...basePath, i], arr1[i], arr2[i]));
  }
  return conflicts;
}

export const diffConflicts = (left: Json, right: Json): PathType[][] => {
  return compareObjects([], left, right);
};
