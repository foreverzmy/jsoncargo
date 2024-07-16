import { diffConflicts } from './diffConflict';
import { generate, merge } from './jsonMergePatch';
import type { Json, ThreeWayMergeResult } from './types';

const patchOptions = { arrays: { deepPatch: true } };

export const threeWayMerge = (base: Json, left: Json, right: Json): ThreeWayMergeResult => {
  const leftPatch = generate(base, left, patchOptions);
  const rightPatch = generate(base, right, patchOptions);

  const conflicts = diffConflicts(leftPatch, rightPatch);

  if (conflicts.length === 0) {
    return {
      conflict: false,
      result: merge(left, rightPatch, patchOptions),
      conflicts,
    };
  }

  return {
    conflict: true,
    result: null,
    conflicts,
  };
};
