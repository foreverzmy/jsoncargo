import toPath from 'lodash/toPath';
import get from 'lodash/get';
import isEqual from 'lodash/isEqual';
import type { Delta, ObjectDelta } from './types';
import { isNumericString } from './utils';

export const getDeltaByPath = (delta: Delta, path: string | string[]): Delta => {
  if (typeof delta !== 'object' || delta === null) {
    return;
  }

  if (!Array.isArray(path) && typeof path !== 'string') {
    return;
  }

  const paths = toPath(path);

  if (paths.length === 0) {
    return delta;
  }

  const [firstPath, ...restPath] = paths;

  if (Array.isArray(delta)) {
    if (delta.length === 1) {
      // AddedDelta
      const result = get(delta[0], paths);
      if (typeof result !== 'undefined') {
        return [result];
      }
      return;
    }
    if (delta.length === 2) {
      // ModifiedDelta
      const left = get(delta[0], paths);
      const right = get(delta[1], paths);
      if (typeof left !== 'undefined' || typeof right !== 'undefined') {
        return [left, right];
      }
      return;
    }
    if (delta.length === 3 && delta[1] === 0 && delta[2] === 0) {
      // DeletedDelta
      const result = get(delta[0], paths);
      if (typeof result !== 'undefined') {
        return [result, 0, 0];
      }
      return;
    }
    if (delta.length === 3 && delta[2] === 3) {
      // MovedDelta Not Support
      return;
    }

    if (delta.length === 3 && delta[2] === 2) {
      // TextDiffDelta
      const result = get(delta[0], paths);
      if (typeof result !== 'undefined') {
        return [result, 0, 2];
      }
      return;
    }
    return;
  }

  /********* ArrayDelta ***********/
  if (delta._t === 'a') {
    if (typeof firstPath !== 'number' && !isNumericString(firstPath)) {
      return;
    }
    const deleteDelta = get(delta, `_${firstPath}`);
    const addDelta = get(delta, firstPath);
    const deleteValue = getDeltaByPath(deleteDelta, restPath);
    const addValue = getDeltaByPath(addDelta, restPath);
    const hasDelete = typeof deleteValue !== 'undefined';
    const hasAdd = typeof addValue !== 'undefined';
    if (hasDelete && hasAdd) {
      if (isEqual(deleteValue[0], addValue[0])) {
        return;
      }
      return [deleteValue[0], addValue[0]];
    }
    if (hasDelete) {
      return deleteValue;
    }

    if (hasAdd) {
      return addValue;
    }

    return;
  }

  /********* ObjectDelta ***********/
  const childDelta = (delta as ObjectDelta)[firstPath];
  if (childDelta) {
    return getDeltaByPath(childDelta, restPath);
  }

  return;
};
