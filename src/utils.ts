import isObject from 'lodash/isObject';
import transform from 'lodash/transform';
import type { Json } from './types';

export const isNumericString = (value: string): boolean => {
  return /^\d+$/.test(value);
};

export const isJsonObject = (value: unknown): value is { [key: string]: Json } => {
  return (
    value !== null &&
    typeof value === 'object' &&
    !Array.isArray(value) &&
    !(value instanceof Date) &&
    !(value instanceof RegExp) &&
    !(value instanceof Function)
  );
};

export const isNullish = (value: unknown): value is null | undefined => value === null || value === undefined;

export const cloneJsonDeep = <T extends Json>(
  value: T,
  options: { omitKeys?: string[]; omitNull?: boolean; omitUndefined?: boolean } = {},
): T => {
  const { omitKeys = [], omitNull = false, omitUndefined = false } = options;
  if (Array.isArray(value)) {
    return value.map((item) => cloneJsonDeep(item, options)) as T;
  }

  if (!isJsonObject(value)) {
    return value;
  }

  return transform(value, (result, val, key) => {
    if (!isJsonObject(result)) {
      return result;
    }
    if (omitKeys.includes(key)) {
      return result;
    }
    if (isObject(val)) {
      result[key] = cloneJsonDeep(val, options);
    } else if (val !== null && typeof val !== 'undefined') {
      result[key] = cloneJsonDeep(val, options);
    } else if (val === null && !omitNull) {
      result[key] = val;
    } else if (typeof val === 'undefined' && !omitUndefined) {
      result[key] = val;
    }
    return result;
  });
};
