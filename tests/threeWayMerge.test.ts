import { describe, expect, test } from 'bun:test';

import { type Json, type PathType, threeWayMerge } from '../src';

interface TestCase {
  description: string;
  conflict: boolean;
  base: Json;
  local: Json;
  remote: Json;
  expected: Json;
  conflicts?: PathType[][];
}

const testCases: Array<TestCase> = [
  {
    description: 'No conflict, only local changes',
    conflict: false,
    base: { a: 1, b: 2 },
    local: { a: 1, b: 3 },
    remote: { a: 1, b: 2 },
    expected: { a: 1, b: 3 },
  },
  {
    description: 'No conflict, only remote changes',
    conflict: false,
    base: { a: 1, b: 2 },
    local: { a: 1, b: 2 },
    remote: { a: 1, b: 3 },
    expected: { a: 1, b: 3 },
  },
  {
    description: 'Both local and remote changes, same value',
    conflict: false,
    base: { a: 1, b: 2 },
    local: { a: 1, b: 3 },
    remote: { a: 1, b: 3 },
    expected: { a: 1, b: 3 },
  },
  {
    description: 'Both local and remote changes, different values',
    conflict: true,
    base: { a: 1, b: 2 },
    local: { a: 1, b: 3 },
    remote: { a: 1, b: 4 },
    expected: null,
    conflicts: [['b']],
  },
  {
    description: 'Local adds new key',
    conflict: false,
    base: { a: 1, b: 2 },
    local: { a: 1, b: 2, c: 3 },
    remote: { a: 1, b: 2 },
    expected: { a: 1, b: 2, c: 3 },
  },
  {
    description: 'Remote adds new key',
    conflict: false,
    base: { a: 1, b: 2 },
    local: { a: 1, b: 2 },
    remote: { a: 1, b: 2, c: 3 },
    expected: { a: 1, b: 2, c: 3 },
  },
  {
    description: 'Both add different new keys',
    conflict: false,
    base: { a: 1, b: 2 },
    local: { a: 1, b: 2, c: 3 },
    remote: { a: 1, b: 2, d: 4 },
    expected: { a: 1, b: 2, c: 3, d: 4 },
  },
  {
    description: 'Base, local and remote are identical',
    conflict: false,
    base: { a: 1, b: 2 },
    local: { a: 1, b: 2 },
    remote: { a: 1, b: 2 },
    expected: { a: 1, b: 2 },
  },
  {
    description: 'Base and local identical, remote removes a key',
    conflict: false,
    base: { a: 1, b: 2 },
    local: { a: 1, b: 2 },
    remote: { a: 1 },
    expected: { a: 1 },
  },
  {
    description: 'Base and remote identical, local removes a key',
    conflict: false,
    base: { a: 1, b: 2 },
    local: { a: 1 },
    remote: { a: 1, b: 2 },
    expected: { a: 1 },
  },
  {
    description: 'Nested objects with no conflicts',
    conflict: false,
    base: { a: 1, b: { x: 10, y: 20 } },
    local: { a: 1, b: { x: 15, y: 20 } },
    remote: { a: 1, b: { x: 10, y: 25 } },
    expected: { a: 1, b: { x: 15, y: 25 } },
  },
  {
    description: 'Arrays with additions and removals',
    conflict: true,
    base: { a: [1, 2, 3], b: [4, 5, 6] },
    local: { a: [1, 2, 3, 7], b: [5, 6] },
    remote: { a: [1, 3, 4], b: [4, 5, 6, 7] },
    expected: null,
    conflicts: [['a'], ['b']],
  },
  {
    description: 'Complex nested structures with conflicts',
    conflict: true,
    base: { a: { x: 1, y: { z: 2 } }, b: [1, 2] },
    local: { a: { x: 2, y: { z: 2 } }, b: [1, 2, 3] },
    remote: { a: { x: 1, y: { z: 3 } }, b: [2, 3] },
    expected: null,
    conflicts: [['b']],
  },
  {
    description: 'Deeply nested objects with different changes',
    conflict: false,
    base: { a: { b: { c: { d: 1 } } } },
    local: { a: { b: { c: { d: 2, e: 3 } } } },
    remote: { a: { b: { c: { d: 1, f: 4 } } } },
    expected: { a: { b: { c: { d: 2, e: 3, f: 4 } } } },
  },
  {
    description: 'Deeply nested objects with conflicts',
    conflict: true,
    base: { a: { b: { c: { d: 1 } } } },
    local: { a: { b: { c: { d: 2, e: 3 } } } },
    remote: { a: { b: { c: { d: 3, e: 4 } } } },
    expected: null,
    conflicts: [
      ['a', 'b', 'c', 'd'],
      ['a', 'b', 'c', 'e'],
    ],
  },
  {
    description: 'Arrays and objects combined',
    conflict: false,
    base: { a: [{ x: 1 }, { y: 2 }] },
    local: { a: [{ x: 1 }, { y: 3 }] },
    remote: { a: [{ x: 2 }, { y: 2 }] },
    expected: { a: [{ x: 2 }, { y: 3 }] },
  },
  {
    description: 'Arrays and objects combined with conflicts',
    conflict: true,
    base: { a: [{ x: 1 }, { y: 2 }] },
    local: { a: [{ x: 2 }, { y: 3 }, 'c'] },
    remote: { a: [{ x: 3 }, { y: 4 }, 'd'] },
    expected: null,
    conflicts: [
      ['a', 0, 'x'],
      ['a', 1, 'y'],
      ['a', 2],
    ],
  },
];

describe('threeWayMerge', () => {
  for (const { description, base, local, remote, expected, conflict, conflicts } of testCases) {
    const result = threeWayMerge(base, remote, local);

    test(description, () => {
      expect(result.conflict).toEqual(conflict);
      expect(result.result).toEqual(expected);
      if (conflicts) {
        expect(result.conflicts).toEqual(conflicts);
      }
    });
  }
});
