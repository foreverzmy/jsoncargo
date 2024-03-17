/************ jsondiffpatch Delta *****************/
export type AddedDelta = [unknown];
export type ModifiedDelta = [unknown, unknown];
export type DeletedDelta = [unknown, 0, 0];

export interface ObjectDelta {
  [property: string]: Delta;
}

export interface ArrayDelta {
  _t: 'a';
  [index: number | `${number}`]: Delta;
  [index: `_${number}`]: DeletedDelta | MovedDelta;
}

export type MovedDelta = [unknown, number, 3];

export type TextDiffDelta = [string, 0, 2];

export type Delta =
  | AddedDelta
  | ModifiedDelta
  | DeletedDelta
  | ObjectDelta
  | ArrayDelta
  | MovedDelta
  | TextDiffDelta
  | undefined;

export enum DELTA_TYPE {
  ADDED = 'added',
  DELETED = 'deleted',
  MODIFIED = 'modified',
  UNCHANGED = 'unchanged',
  UNKNOWN = 'unknown',
}
