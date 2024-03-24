import setWith from 'lodash/setWith';
import isUndefined from 'lodash/isUndefined';
import type { JsonSchema, Json } from './types';
import { getSchemaByPath } from './getSchemaByPath';

export const setWithSchema = (obj: Json, path: string | string[], val: Json, schema: JsonSchema): Json | undefined => {
  if (typeof obj !== 'object' || obj === null) {
    return obj;
  }

  let currentSchema: JsonSchema | undefined = schema;
  return setWith(obj, path, val, (nsValue, key) => {
    if (!isUndefined(nsValue)) {
      return nsValue;
    }
    if (!currentSchema) {
      return;
    }

    currentSchema = getSchemaByPath(currentSchema, key);
    switch (currentSchema?.type) {
      case 'object':
        return {};
      case 'array':
        return [];
    }
    return nsValue;
  });
};
