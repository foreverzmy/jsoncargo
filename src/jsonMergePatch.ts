import uniq from 'lodash/uniq';
import isEqual from 'lodash/isEqual';
import type { Json } from './types';
import { isJsonObject, cloneJsonDeep } from './utils';

export const apply = (target: Json, patch: Json) => {
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

    acc[key] = apply(target[key], patch[key]);

    return acc;
  }, target);
};

export const merge = (original: Json, patch: Json): Json => {
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

      acc[key] = merge(original[key], patch[key]);
      return acc;
    },
    {} as Record<string, Json>,
  );
};

export const generate = (original: Json, result: Json): Json => {
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

      if (Array.isArray(rv) || Array.isArray(ov)) {
        acc[key] = cloneJsonDeep(rv);
        return acc;
      }

      if (ov === rv) {
        return acc;
      }

      if (isEqual(ov, rv)) {
        return acc;
      }
      acc[key] = generate(ov, rv);
      return acc;
    },
    {} as Record<string, Json>,
  );
};
