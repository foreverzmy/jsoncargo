import { test, expect } from 'bun:test';

import { type Json, jsonMergePatch, isJsonObject, cloneJsonDeep } from '../src';

const cases: Array<{ original: Json; patch: Json; result: Json; generatePatch?: Json }> = [
  {
    original: { a: 'b' },
    patch: { a: 'c' },
    result: { a: 'c' },
  },
  {
    original: { a: 'b' },
    patch: { b: 'c' },
    result: { a: 'b', b: 'c' },
  },
  {
    original: { a: 'b' },
    patch: { a: null },
    result: {},
  },
  {
    original: { a: 'b', b: 'c' },
    patch: { a: null },
    result: { b: 'c' },
  },
  {
    original: { a: ['b'] },
    patch: { a: 'c' },
    result: { a: 'c' },
  },
  {
    original: { a: 'c' },
    patch: { a: ['b'] },
    result: { a: ['b'] },
  },
  {
    original: { a: { b: 'c' } },
    patch: { a: { b: 'd', c: null } },
    result: { a: { b: 'd' } },
    generatePatch: { a: { b: 'd' } },
  },
  {
    original: { a: [{ b: 'c' }] },
    patch: { a: [1] },
    result: { a: [1] },
  },
  {
    original: ['a', 'b'],
    patch: ['c', 'd'],
    result: ['c', 'd'],
  },
  {
    original: { a: 'b' },
    patch: ['c'],
    result: ['c'],
  },
  {
    original: { a: 'foo' },
    patch: null,
    result: null,
  },
  {
    original: { a: 'foo' },
    patch: 'bar',
    result: 'bar',
  },
  {
    original: { e: null },
    patch: { a: 1 },
    result: { e: null, a: 1 },
  },
  {
    original: [1, 2],
    patch: { a: 'b', c: null },
    result: { a: 'b' },
    generatePatch: { a: 'b' },
  },
  {
    original: {},
    patch: { a: { bb: { ccc: null } } },
    result: { a: { bb: {} } },
    generatePatch: { a: { bb: {} } },
  },
];

test('jsonMergePatch merge', () => {
  for (const { original, patch, result } of cases) {
    expect(jsonMergePatch.merge(original, patch)).toEqual(result);
  }
});

test('jsonMergePatch apply', () => {
  for (const { original, patch, result } of cases) {
    const cloneOriginal = cloneJsonDeep(original);
    const target = jsonMergePatch.apply(cloneOriginal, patch);
    if (isJsonObject(cloneOriginal) && isJsonObject(target)) {
      expect(cloneOriginal as Json).toBe(target);
    }
    expect(target).toEqual(result);
  }
});

test('jsonMergePatch generate', () => {
  for (const { original, patch, result, generatePatch } of cases) {
    expect(jsonMergePatch.generate(original, result)).toEqual(generatePatch ?? patch);
  }
});
