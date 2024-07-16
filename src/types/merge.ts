import type { Json } from './schema';

export interface ThreeWayMergeResult {
  conflict: boolean;
  result: Json;
  conflicts: PathType[][];
}

export interface JsonMergePatchOptions {
  arrays?: {
    deepPatch: boolean;
  };
}

export type PathType = string | number;
