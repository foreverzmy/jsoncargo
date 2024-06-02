import type { Json } from './schema';

export interface ThreeWayMergeResult {
  conflict: boolean;
  result: Json;
  conflicts: string[];
}

export interface JsonMergePatchOptions {
  arrays?: {
    deepPatch: boolean;
  };
}
