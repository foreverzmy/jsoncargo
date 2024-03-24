import { test, expect } from 'bun:test';
import { setWithSchema } from '../src';

test('Test setWithSchema', () => {
  const obj = setWithSchema({}, 'a[0][2][0]b.c', true, {
    type: 'object',
    additionalProperties: {
      type: 'array',
      items: {
        type: 'object',
        additionalProperties: {
          type: 'array',
          items: {
            type: 'object',
            additionalProperties: {
              type: 'boolean',
            },
          },
        },
      },
    },
  });

  expect(obj).toEqual({ a: [{ '2': [{ b: { c: true } }] }] });
});
