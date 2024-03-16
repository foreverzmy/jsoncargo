import { test, expect } from 'bun:test';
import { getSchemaByPath, type JsonSchema } from '../src';

import _Schema01 from '../mock/01.schema.json';
import _Schema02 from '../mock/02.schema.json';
import _Schema03 from '../mock/03.schema.json';
import _Schema04 from '../mock/04.schema.json';
import _Schema05 from '../mock/05.schema.json';
import _Schema06 from '../mock/06.schema.json';
import _Schema07 from '../mock/07.schema.json';
import _Schema08 from '../mock/08.schema.json';
import _Schema09 from '../mock/09.schema.json';
import _Schema10 from '../mock/10.schema.json';

const Schema01 = _Schema01 as JsonSchema;
const Schema02 = _Schema02 as JsonSchema;
const Schema03 = _Schema03 as JsonSchema;
const Schema04 = _Schema04 as JsonSchema;
const Schema05 = _Schema05 as JsonSchema;
const Schema06 = _Schema06 as JsonSchema;
const Schema07 = _Schema07 as JsonSchema;
const Schema08 = _Schema08 as JsonSchema;
const Schema09 = _Schema09 as JsonSchema;
const Schema10 = _Schema10 as JsonSchema;

test('Test getSchemaByPath 01', () => {
  expect(getSchemaByPath(Schema01, '')).toEqual({ type: 'string' });
  expect(getSchemaByPath(Schema01, 'a')).toBeUndefined();
});

test('A simple object schema with direct property access', () => {
  expect(getSchemaByPath(Schema02, 'name')).toEqual({ type: 'string' });
  expect(getSchemaByPath(Schema02, 'age')).toEqual({ type: 'integer', minimum: 0 });
  expect(getSchemaByPath(Schema02, ['name'])).toEqual({ type: 'string' });
  expect(getSchemaByPath(Schema02, ['age'])).toEqual({ type: 'integer', minimum: 0 });
});

test('A nested object schema with multiple levels of properties', () => {
  expect(getSchemaByPath(Schema03, 'address.street')).toMatchObject({ type: 'string' });
  expect(getSchemaByPath(Schema03, ['address', 'street'])).toMatchObject({ type: 'string' });
  expect(getSchemaByPath(Schema03, 'address.city')).toMatchObject({ type: 'string' });
  expect(getSchemaByPath(Schema03, ['address', 'city'])).toMatchObject({ type: 'string' });
  expect(getSchemaByPath(Schema03, 'phoneNumbers.1.type')).toMatchObject({ type: 'string' });
  expect(getSchemaByPath(Schema03, ['phoneNumbers', '2', 'number'])).toMatchObject({ type: 'string' });
});

test('An array schema with direct item access', () => {
  expect(getSchemaByPath(Schema04, 'phoneNumbers.2')).toMatchObject({ type: 'string' });
  expect(getSchemaByPath(Schema04, ['phoneNumbers', '2'])).toMatchObject({ type: 'string' });
  expect(getSchemaByPath(Schema04, 'preferences.0')).toMatchObject({ type: 'string' });
  expect(getSchemaByPath(Schema04, ['preferences', '0'])).toMatchObject({ type: 'string' });
  expect(getSchemaByPath(Schema04, 'preferences.1')).toMatchObject({ type: 'number' });
  expect(getSchemaByPath(Schema04, ['preferences', '1'])).toMatchObject({ type: 'number' });
  expect(getSchemaByPath(Schema04, 'preferences.2')).toBeUndefined();
  expect(getSchemaByPath(Schema04, ['preferences', '2'])).toBeUndefined();
});

test('A complex schema with mixed types and nested structures', () => {
  expect(getSchemaByPath(Schema05, 'name')).toMatchObject({ type: 'string' });
  expect(getSchemaByPath(Schema05, 'age')).toMatchObject({ type: 'integer', minimum: 0 });
  expect(getSchemaByPath(Schema05, ['married'])).toMatchObject({ type: 'boolean' });
  expect(getSchemaByPath(Schema05, ['spouse'])).toMatchObject({ type: ['object', 'null'] });
  expect(getSchemaByPath(Schema05, 'spouse.name')).toMatchObject({ type: 'string' });
  expect(getSchemaByPath(Schema05, ['spouse', 'age'])).toMatchObject({ type: 'integer' });
  expect(getSchemaByPath(Schema05, 'children')).toMatchObject({ type: 'array' });
  expect(getSchemaByPath(Schema05, ['children', '2'])).toMatchObject({ $ref: '#' });
  expect(getSchemaByPath(Schema05, ['favoriteNumbers'])).toMatchObject({ type: 'array' });
  expect(getSchemaByPath(Schema05, 'favoriteNumbers.30')).toMatchObject({ type: 'number' });
  expect(getSchemaByPath(Schema05, 'address')).toMatchObject({ type: 'object' });
  expect(getSchemaByPath(Schema05, 'address.street')).toMatchObject({ type: 'string' });
  expect(getSchemaByPath(Schema05, ['address', 'city'])).toMatchObject({ type: 'string' });
  expect(getSchemaByPath(Schema05, ['address', 'postalCode'])).toMatchObject({ type: 'string' });
  expect(getSchemaByPath(Schema05, ['address', 'xxx'])).toBeUndefined();
});

test('Accessing a property not defined in the schema, to test additionalProperties', () => {
  expect(getSchemaByPath(Schema06, 'name')).toEqual({ type: 'string' });
  expect(getSchemaByPath(Schema06, 'age')).toEqual({ type: 'integer', minimum: 0 });
  expect(getSchemaByPath(Schema06, ['hello'])).toEqual({ type: 'boolean' });
  expect(getSchemaByPath(Schema06, 'world')).toEqual({ type: 'boolean' });
});

test('Accessing an index in an array schema where items is an object (testing default item schema)', () => {
  expect(getSchemaByPath(Schema07, '0')).toMatchObject({ type: 'object' });
  expect(getSchemaByPath(Schema07, '1.id')).toMatchObject({ type: 'integer' });
  expect(getSchemaByPath(Schema07, ['2', 'name'])).toEqual({ type: 'string' });
  expect(getSchemaByPath(Schema07, '3.address')).toMatchObject({ type: 'object' });
  expect(getSchemaByPath(Schema07, ['3', 'address', 'street'])).toMatchObject({ type: 'string' });
  expect(getSchemaByPath(Schema07, '223.address.city')).toMatchObject({ type: 'string' });
  expect(getSchemaByPath(Schema07, '[333].address.city')).toMatchObject({ type: 'string' });
});

test('Accessing an index in an array schema with specific item definitions', () => {
  expect(getSchemaByPath(Schema08, '0')).toEqual({ type: 'string' });
  expect(getSchemaByPath(Schema08, '1')).toEqual({ type: 'number' });
  expect(getSchemaByPath(Schema08, '2')).toEqual({ type: 'boolean' });
  expect(getSchemaByPath(Schema08, ['3'])).toEqual({ type: 'boolean' });
  expect(getSchemaByPath(Schema08, 'a')).toBeUndefined();
});

test('Using a path that matches a pattern in patternProperties', () => {
  expect(getSchemaByPath(Schema09, 'name')).toEqual({ type: 'string' });
  expect(getSchemaByPath(Schema09, 'age')).toEqual({ type: 'integer', minimum: 0 });
  expect(getSchemaByPath(Schema09, 'xxx')).toEqual({ type: 'boolean' });
  expect(getSchemaByPath(Schema09, ['num_1'])).toEqual({ type: 'number' });
  expect(getSchemaByPath(Schema09, 'str_hello')).toEqual({ type: 'string' });
  expect(getSchemaByPath(Schema09, 'obj_a.name')).toEqual({ type: 'string' });
  expect(getSchemaByPath(Schema09, ['obj_b', 'num_a'])).toEqual({ type: 'number' });
  expect(getSchemaByPath(Schema09, ['obj_c', 'str_01'])).toEqual({ type: 'string' });
  expect(getSchemaByPath(Schema09, 'obj_ddd.hello')).toEqual({ type: 'boolean' });
});

test('A path that leads to an undefined schema part, testing graceful failure', () => {
  expect(getSchemaByPath(Schema03, 'xxx.bbb.ccc')).toBeUndefined();
  expect(getSchemaByPath(Schema04, 'preferences.0.aa')).toBeUndefined();
  expect(getSchemaByPath(Schema04, 'preferences.bbb.ccc')).toBeUndefined();
  expect(getSchemaByPath(Schema05, ['spouse', 'xxxxx'])).toBeUndefined();
  expect(getSchemaByPath(Schema06, ['others', 'cccc'])).toBeUndefined();
  expect(getSchemaByPath(Schema07, '01.address.postcode')).toBeUndefined();
  expect(getSchemaByPath(Schema07, 'xxx.address.postcode')).toBeUndefined();
});

test('Accessing nested arrays and objects combination', () => {
  const cases = [
    { path: ['profile', 'personalInfo', 'name'], matched: { type: 'string' } },
    { path: ['profile', 'personalInfo', 'age'], matched: { type: 'integer' } },
    { path: ['profile', 'personalInfo', 'contacts', '2', 'type'], matched: { type: 'string' } },
    { path: ['profile', 'personalInfo', 'contacts', '2', 'detail'], matched: { type: 'string' } },
    { path: ['profile', 'education', '3', 'level'], matched: { type: 'string' } },
    { path: ['profile', 'education', '123', 'year'], matched: { type: 'integer' } },
    { path: ['jobHistory', '555', 'companyName'], matched: { type: 'string' } },
    { path: ['jobHistory', '555', 'role'], matched: { type: 'string' } },
    { path: ['jobHistory', '88786', 'duration'], matched: { type: 'object' } },
    { path: ['jobHistory', '88786', 'duration', 'from'], matched: { type: 'string' } },
    { path: ['jobHistory', '88786', 'duration', 'to'], matched: { type: 'string' } },
    { path: ['jobHistory', '9527', 'details', 'department'], matched: { type: 'string' } },
    { path: ['jobHistory', '9527', 'details', 'responsibilities'], matched: { type: 'array' } },
    { path: ['jobHistory', '9527', 'details', 'responsibilities', '23'], matched: { type: 'string' } },
  ];

  for (const { path, matched } of cases) {
    expect(getSchemaByPath(Schema10, path)).toMatchObject(matched);
    expect(getSchemaByPath(Schema10, path.join('.'))).toMatchObject(matched);
  }

  expect(getSchemaByPath(Schema10, 'profile.education[123].year')).toMatchObject({ type: 'integer' });
});
