import uniq from 'lodash/uniq';
import isEqual from 'lodash/isEqual';
import type { Json, JsonArray, JsonMergePatchOptions } from './types';
import { isJsonObject, cloneJsonDeep } from './utils';

export const apply = (target: Json, patch: Json, options: JsonMergePatchOptions = {}) => {
  const { arrays } = options;
  const { deepPatch = false } = arrays ?? {};
  if (deepPatch && Array.isArray(patch) && Array.isArray(target)) {
    const maxLength = Math.max(target.length, patch.length);
    let deleteCount = 0;
    for (let i = 0; i < maxLength; i++) {
      if (patch[i] === null) {
        target.splice(i, 1);
        deleteCount++;
      } else if (typeof patch[i] !== 'undefined') {
        target[i - deleteCount] = apply(target[i], patch[i], options);
      }
    }

    return target;
  }

  if (!isJsonObject(patch) || !isJsonObject(target)) {
    // biome-ignore lint/style/noParameterAssign: change target direct
    target = cloneJsonDeep(patch, { omitNull: true });
    return target;
  }

  return Object.keys(patch).reduce((acc, key) => {
    if (patch[key] === null) {
      delete acc[key];
      return acc;
    }

    if (typeof patch[key] === 'undefined') {
      return acc;
    }

    acc[key] = apply(target[key], patch[key], options);

    return acc;
  }, target);
};

export const merge = (original: Json, patch: Json, options: JsonMergePatchOptions = {}): Json => {
  const { arrays } = options;
  const { deepPatch: arraysDeepPatch = false } = arrays ?? {};
  if (arraysDeepPatch && Array.isArray(patch) && Array.isArray(original)) {
    const maxLength = Math.max(original.length, patch.length);
    const result = [];
    for (let i = 0; i < maxLength; i++) {
      if (typeof patch[i] === 'undefined') {
        result.push(original[i]);
      } else if (patch[i] !== null) {
        result.push(merge(original[i], patch[i]));
      }
    }
    return result;
  }

  if (!isJsonObject(patch) || !isJsonObject(original)) {
    return cloneJsonDeep(patch, { omitNull: true });
  }

  const keys = uniq([...Object.keys(original), ...Object.keys(patch)]);

  return keys.reduce(
    (acc, key) => {
      if (patch[key] === null) {
        return acc;
      }

      if (typeof patch[key] === 'undefined') {
        acc[key] = cloneJsonDeep(original[key]);
        return acc;
      }
      if (typeof original[key] === 'undefined') {
        acc[key] = cloneJsonDeep(patch[key], { omitNull: true });
        return acc;
      }

      acc[key] = merge(original[key], patch[key], options);
      return acc;
    },
    {} as Record<string, Json>,
  );
};

export const generate = (original: Json, result: Json, options: JsonMergePatchOptions = {}): Json => {
  const { arrays } = options;
  const { deepPatch: arraysDeepPatch = false } = arrays ?? {};
  if (arraysDeepPatch && Array.isArray(result) && Array.isArray(original)) {
    const maxLength = Math.max(original.length, result.length);
    const patch: JsonArray = [];
    for (let i = 0; i < maxLength; i++) {
      if (isEqual(original[i], result[i])) {
        patch.push(undefined as any);
      } else if (typeof result[i] === 'undefined' && typeof original !== 'undefined') {
        patch.push(null);
      } else {
        patch.push(generate(original[i], result[i], options));
      }
    }
    return patch;
  }
  if (!isJsonObject(original) || !isJsonObject(result)) {
    return cloneJsonDeep(result);
  }

  const keys = uniq([...Object.keys(original), ...Object.keys(result)]);

  return keys.reduce(
    (acc, key) => {
      const ov = original[key];
      const rv = result[key];

      if (typeof ov !== 'undefined' && typeof rv === 'undefined') {
        acc[key] = null;
        return acc;
      }

      if (arraysDeepPatch && Array.isArray(rv) && Array.isArray(ov)) {
        acc[key] = generate(ov, rv, options);
        return acc;
      }

      if (Array.isArray(rv) || Array.isArray(ov)) {
        acc[key] = rv;
        return acc;
      }

      if (ov === rv) {
        return acc;
      }

      if (isEqual(ov, rv)) {
        return acc;
      }

      acc[key] = generate(ov, rv, options);
      return acc;
    },
    {} as Record<string, Json>,
  );
};
