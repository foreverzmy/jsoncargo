import get from 'lodash/get';
import toPath from 'lodash/toPath';
import type { Delta, Json, JsonSchema } from './types';
import { setWithSchema } from '.';

interface Params {
  schema: JsonSchema;
  delta: Delta;
  target: Json;
  path: string | string[];
  value: Json;
}

export const patchDelta = ({ delta, path, target, value, schema }: Params): Delta => {
  if (!Array.isArray(path) && typeof path !== 'string') {
    return;
  }

  const valueType = typeof value;
  const paths = toPath(path);

  if (paths.length === 0) {
    return valueType === 'undefined' || value === null ? {} : [value];
  }

  const updateDelta = (
    currentDelta: Delta,
    remainingPath: string[],
    currentTarget: Json,
    currentSchema: JsonSchema,
  ): Delta => {
    if (typeof get(currentTarget, remainingPath) === 'undefined') {
      // 原来的值不存在，新增
      return [setWithSchema({}, remainingPath, value, currentSchema)];
    }
  };

  return updateDelta(delta, paths, target, schema);
};
