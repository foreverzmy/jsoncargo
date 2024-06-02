import { test, expect } from 'bun:test';

import {
  type Json,
  type JsonMergePatchOptions,
  jsonMergePatch,
  isJsonObject,
  cloneJsonDeep,
  type JsonArray,
} from '../src';

interface TestCase {
  original: Json;
  patch: Json;
  result: Json;
  generatePatch?: Json;
  options?: JsonMergePatchOptions;
}

const testCases: Array<TestCase> = [
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
    options: { arrays: { deepPatch: true } },
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
  {
    original: ['a', 'b'],
    patch: ['c', 'd', 'e'],
    result: ['c', 'd', 'e'],
    options: { arrays: { deepPatch: true } },
  },
  {
    original: ['a', 'b'],
    patch: ['a', 'b', 'e'],
    result: ['a', 'b', 'e'],
    options: { arrays: { deepPatch: true } },
    generatePatch: [undefined, undefined, 'e'] as JsonArray,
  },
  {
    original: ['a', 'b', 'e'],
    patch: [undefined, undefined, null] as JsonArray,
    result: ['a', 'b'],
    options: { arrays: { deepPatch: true } },
  },
  {
    original: ['a', 'b', 'e'],
    patch: [undefined, null, undefined, 'f'] as JsonArray,
    result: ['a', 'e', 'f'],
    options: { arrays: { deepPatch: true } },
    generatePatch: [undefined, 'e', 'f'] as JsonArray,
  },
];

test('jsonMergePatch merge', () => {
  for (const { original, patch, result, options } of testCases) {
    expect(jsonMergePatch.merge(original, patch, options)).toEqual(result);
  }
});

test('jsonMergePatch apply', () => {
  for (const { original, patch, result, options } of testCases) {
    const cloneOriginal = cloneJsonDeep(original);
    const target = jsonMergePatch.apply(cloneOriginal, patch, options);
    if (isJsonObject(cloneOriginal) && isJsonObject(target)) {
      expect(cloneOriginal as Json).toBe(target);
    }
    expect(target).toEqual(result);
  }
});

test('jsonMergePatch generate', () => {
  for (const { original, patch, result, generatePatch, options } of testCases) {
    expect(jsonMergePatch.generate(original, result, options)).toEqual(generatePatch ?? patch);
  }
});
