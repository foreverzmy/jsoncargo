import get from 'lodash/get';
import toPath from 'lodash/toPath';

import { DELTA_TYPE, type Delta, type ObjectDelta } from './types';
import { isNumericString } from './utils';
import { getDeltaByPath } from './getDeltaByPath';

export type GetDeltaTypeOptions = {
  deep?: boolean;
};

export const getDeltaType = (
  delta: Delta,
  path: string | string[] = [],
  options: GetDeltaTypeOptions = {},
): DELTA_TYPE => {
  if (typeof delta !== 'object' || delta === null) {
    return DELTA_TYPE.UNCHANGED;
  }

  if (!Array.isArray(path) && typeof path !== 'string') {
    return DELTA_TYPE.UNKNOWN;
  }

  if (options.deep) {
    const deepDelta = getDeltaByPath(delta, path);

    if (!deepDelta) {
      return DELTA_TYPE.UNCHANGED;
    }

    if (typeof deepDelta !== 'object') {
      return DELTA_TYPE.UNKNOWN;
    }

    if (Array.isArray(deepDelta)) {
      if (deepDelta.length === 1) {
        // AddedDelta
        return DELTA_TYPE.ADDED;
      }
      if (deepDelta.length === 2) {
        // ModifiedDelta
        return DELTA_TYPE.MODIFIED;
      }
      if (deepDelta.length === 3 && deepDelta[1] === 0 && deepDelta[2] === 0) {
        // DeletedDelta
        return DELTA_TYPE.DELETED;
      }
      if (deepDelta.length === 3 && deepDelta[2] === 2) {
        // TextDiffDelta
        return DELTA_TYPE.MODIFIED;
      }
      if (deepDelta.length === 3 && deepDelta[2] === 3) {
        // MovedDelta
        return DELTA_TYPE.MODIFIED;
      }
      return DELTA_TYPE.UNKNOWN;
    }

    return DELTA_TYPE.MODIFIED;
  }

  const paths = toPath(path);

  if (Array.isArray(delta)) {
    if (delta.length === 1) {
      // AddedDelta
      return DELTA_TYPE.ADDED;
    }
    if (delta.length === 2) {
      return DELTA_TYPE.MODIFIED;
    }
    if (delta.length === 3 && delta[1] === 0 && delta[2] === 0) {
      // DeletedDelta
      return DELTA_TYPE.DELETED;
    }

    if (delta.length === 3 && delta[2] === 2) {
      // TextDiffDelta
      return DELTA_TYPE.MODIFIED;
    }
    if (delta.length === 3 && delta[2] === 3) {
      // MovedDelta
      return DELTA_TYPE.MODIFIED;
    }
    return DELTA_TYPE.UNKNOWN;
  }

  const [firstPath, ...restPath] = paths;

  /********* ArrayDelta ***********/
  if (delta._t === 'a') {
    if (paths.length === 0) {
      return DELTA_TYPE.MODIFIED;
    }
    if (typeof firstPath !== 'number' && !isNumericString(firstPath)) {
      return DELTA_TYPE.UNKNOWN;
    }

    const deleteDelta = get(delta, `_${firstPath}`);
    const addDelta = get(delta, firstPath);
    const hasDelete = typeof deleteDelta !== 'undefined';
    const hasAdd = typeof addDelta !== 'undefined';

    if (hasDelete && hasAdd) {
      return DELTA_TYPE.MODIFIED;
    }
    if (hasDelete) {
      return DELTA_TYPE.DELETED;
    }
    if (hasAdd) {
      if (Array.isArray(hasAdd)) {
        return DELTA_TYPE.ADDED;
      }
      return DELTA_TYPE.MODIFIED;
    }
    return DELTA_TYPE.UNCHANGED;
  }

  /********* ObjectDelta ***********/
  if (paths.length === 0 && Object.keys(delta).length > 0) {
    return DELTA_TYPE.MODIFIED;
  }

  const childDelta = (delta as ObjectDelta)[firstPath];
  if (childDelta) {
    return getDeltaType(childDelta, restPath, options);
  }

  return DELTA_TYPE.UNKNOWN;
};
