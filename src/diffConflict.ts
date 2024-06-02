import type { Json, JsonObject, JsonArray } from './types';

function compareObjects(path: string, val1: Json, val2: Json): string[] {
  const conflicts: string[] = [];
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

function compareJSONObjects(basePath: string, obj1: JsonObject, obj2: JsonObject) {
  const conflicts: string[] = [];
  const keys = new Set([...Object.keys(obj1), ...Object.keys(obj2)]);
  for (const key of keys) {
    const path = basePath ? `${basePath}.${key}` : key;
    conflicts.push(...compareObjects(path, obj1[key], obj2[key]));
  }
  return conflicts;
}

function compareArrays(basePath: string, arr1: JsonArray, arr2: JsonArray) {
  const conflicts: string[] = [];
  if (arr1.includes(null) || arr2.includes(null) || arr1.length !== arr2.length) {
    conflicts.push(basePath);
    return conflicts;
  }
  const maxLength = Math.max(arr1.length, arr2.length);
  for (let i = 0; i < maxLength; i++) {
    const path = `${basePath}[${i}]`;
    conflicts.push(...compareObjects(path, arr1[i], arr2[i]));
  }
  return conflicts;
}

export const diffConflicts = (left: Json, right: Json): string[] => {
  return compareObjects('', left, right);
};
