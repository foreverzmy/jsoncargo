import { test, expect } from 'bun:test';

import { type Delta, getDeltaByPath, getDeltaType, DELTA_TYPE } from '../src';

import _Delta01Add from '../mock/01.add.delta.json';
import _Delta01Delete from '../mock/01.delete.delta.json';
import _DeltaX from '../mock/x.delta.json';

const Delta01Add = _Delta01Add as Delta;
const Delta01Delete = _Delta01Delete as Delta;
const DeltaX = _DeltaX as unknown as Delta;

test('Simple get Added Delta', () => {
  expect<Delta>(getDeltaByPath(Delta01Add, [])).toEqual(Delta01Add);
  expect(getDeltaByPath(Delta01Add, 'a')).toBeUndefined();
  expect(getDeltaByPath(Delta01Add, ['a'])).toBeUndefined();
  expect(getDeltaByPath(Delta01Add, ['0'])).toEqual(['H']);
  expect(getDeltaByPath(Delta01Add, '[2]')).toEqual(['l']);
});

test('Simple get Deleted Delta', () => {
  expect<Delta>(getDeltaByPath(Delta01Delete, [])).toEqual(Delta01Delete);
  expect(getDeltaByPath(Delta01Delete, 'a')).toBeUndefined();
  expect(getDeltaByPath(Delta01Delete, ['a'])).toBeUndefined();
  expect(getDeltaByPath(Delta01Delete, ['0'])).toEqual(['H', 0, 0]);
  expect(getDeltaByPath(Delta01Delete, '[2]')).toEqual(['l', 0, 0]);
});

test('Get Complex Delta', () => {
  expect(getDeltaByPath(DeltaX, 'spanishName')).toEqual(['Sudamérica']);
  expect(getDeltaByPath(DeltaX, 'summary')).toEqual(['something', 0, 2]);
  expect(getDeltaByPath(DeltaX, 'summary[2]')).toEqual(['m', 0, 2]);
  expect(getDeltaByPath(DeltaX, ['surface'])).toEqual([17840000, 0, 0]);
  expect(getDeltaByPath(DeltaX, ['surface', '3'])).toBeUndefined();
  expect(getDeltaByPath(DeltaX, 'demographics')).toHaveProperty('population');
  expect(getDeltaByPath(DeltaX, 'demographics.population')).toEqual([385742554, 385744896]);
  expect(getDeltaByPath(DeltaX, ['demographics', 'population', '3'])).toBeUndefined();
  expect(getDeltaByPath(DeltaX, ['languages'])).toMatchObject({ _t: 'a' });
  expect(getDeltaByPath(DeltaX, ['languages', '1'])).toBeUndefined();
  expect(getDeltaByPath(DeltaX, ['languages', '2'])).toMatchObject(['english', 'inglés']);
  expect(getDeltaByPath(DeltaX, ['languages', '2', '3'])).toBeUndefined();
  expect(getDeltaByPath(DeltaX, 'languages.2.0')).toMatchObject(['e', 'i']);
  expect(getDeltaByPath(DeltaX, 'languages.3')).toBeUndefined();
  expect(getDeltaByPath(DeltaX, ['countries'])).toMatchObject({ _t: 'a' });
  expect(getDeltaByPath(DeltaX, 'countries.0')).toMatchObject({ capital: ['Buenos Aires', 'Rawson'] });
  expect(getDeltaByPath(DeltaX, 'countries[0].capital')).toMatchObject(['Buenos Aires', 'Rawson']);
  expect(getDeltaByPath(DeltaX, ['countries', '4'])).toMatchObject(['', 10, 3]);
  expect(getDeltaByPath(DeltaX, 'countries.8')).toMatchObject(['', 2, 3]);
  expect(getDeltaByPath(DeltaX, 'countries.9')).toMatchObject([{ name: 'Antártida', unasur: false }]);
  expect(getDeltaByPath(DeltaX, 'countries.9.name')).toMatchObject(['Antártida']);
  expect(getDeltaByPath(DeltaX, 'countries.9.unasur')).toMatchObject([false]);
  expect(getDeltaByPath(DeltaX, 'countries.10')).toHaveLength(2);
  expect(getDeltaByPath(DeltaX, 'countries.10.name')).toMatchObject(['Uruguay', 'Colombia']);
  expect(getDeltaByPath(DeltaX, 'countries.10.population')).toMatchObject([42888594]);
  expect(getDeltaByPath(DeltaX, 'countries.10.unasur')).toBeUndefined();
  expect(getDeltaByPath(DeltaX, 'countries.10.xxx')).toBeUndefined();
  expect(getDeltaByPath(DeltaX, 'countries.11')).toHaveLength(3);
  expect(getDeltaByPath(DeltaX, 'countries.11.name')).toMatchObject(['Venezuela', 0, 0]);
  expect(getDeltaByPath(DeltaX, 'countries.11.unasur')).toMatchObject([true, 0, 0]);
});

test('Get Delta Type', () => {
  const cases = [
    { delta: DeltaX, path: ['spanishName'], type: DELTA_TYPE.ADDED, deepType: DELTA_TYPE.ADDED },
    { delta: DeltaX, path: ['summary'], type: DELTA_TYPE.MODIFIED, deepType: DELTA_TYPE.MODIFIED },
    { delta: DeltaX, path: ['summary', '2'], type: DELTA_TYPE.MODIFIED, deepType: DELTA_TYPE.MODIFIED },
    { delta: DeltaX, path: ['surface'], type: DELTA_TYPE.DELETED, deepType: DELTA_TYPE.DELETED },
    { delta: DeltaX, path: ['surface', '3'], type: DELTA_TYPE.DELETED, deepType: DELTA_TYPE.UNCHANGED },
    { delta: DeltaX, path: ['demographics'], type: DELTA_TYPE.MODIFIED, deepType: DELTA_TYPE.MODIFIED },
    { delta: DeltaX, path: ['demographics', 'population'], type: DELTA_TYPE.MODIFIED, deepType: DELTA_TYPE.MODIFIED },
    {
      delta: DeltaX,
      path: ['demographics', 'population', '3'],
      type: DELTA_TYPE.MODIFIED,
      deepType: DELTA_TYPE.UNCHANGED,
    },
    { delta: DeltaX, path: ['languages'], type: DELTA_TYPE.MODIFIED, deepType: DELTA_TYPE.MODIFIED },
    { delta: DeltaX, path: ['languages', '1'], type: DELTA_TYPE.UNCHANGED, deepType: DELTA_TYPE.UNCHANGED },
    { delta: DeltaX, path: ['languages', '3'], type: DELTA_TYPE.UNCHANGED, deepType: DELTA_TYPE.UNCHANGED },
    { delta: DeltaX, path: ['languages', '2'], type: DELTA_TYPE.MODIFIED, deepType: DELTA_TYPE.MODIFIED },
    { delta: DeltaX, path: ['languages', '2', '0'], type: DELTA_TYPE.MODIFIED, deepType: DELTA_TYPE.MODIFIED },
    { delta: DeltaX, path: ['languages', '2', '1'], type: DELTA_TYPE.MODIFIED, deepType: DELTA_TYPE.UNCHANGED },
    { delta: DeltaX, path: ['languages', '2', '3'], type: DELTA_TYPE.MODIFIED, deepType: DELTA_TYPE.UNCHANGED },
    { delta: DeltaX, path: ['countries'], type: DELTA_TYPE.MODIFIED, deepType: DELTA_TYPE.MODIFIED },
    { delta: DeltaX, path: ['countries', '0'], type: DELTA_TYPE.MODIFIED, deepType: DELTA_TYPE.MODIFIED },
    { delta: DeltaX, path: ['countries', '0', 'capital'], type: DELTA_TYPE.MODIFIED, deepType: DELTA_TYPE.MODIFIED },
    { delta: DeltaX, path: ['countries', '4'], type: DELTA_TYPE.DELETED, deepType: DELTA_TYPE.MODIFIED },
    { delta: DeltaX, path: ['countries', '8'], type: DELTA_TYPE.DELETED, deepType: DELTA_TYPE.MODIFIED },
    { delta: DeltaX, path: ['countries', '9'], type: DELTA_TYPE.MODIFIED, deepType: DELTA_TYPE.ADDED },
    { delta: DeltaX, path: ['countries', '9', 'name'], type: DELTA_TYPE.MODIFIED, deepType: DELTA_TYPE.ADDED },
    { delta: DeltaX, path: ['countries', '9', 'unasur'], type: DELTA_TYPE.MODIFIED, deepType: DELTA_TYPE.ADDED },
    { delta: DeltaX, path: ['countries', '10'], type: DELTA_TYPE.MODIFIED, deepType: DELTA_TYPE.MODIFIED },
    { delta: DeltaX, path: ['countries', '10', 'name'], type: DELTA_TYPE.MODIFIED, deepType: DELTA_TYPE.MODIFIED },
    { delta: DeltaX, path: ['countries', '10', 'unasur'], type: DELTA_TYPE.MODIFIED, deepType: DELTA_TYPE.UNCHANGED },
    {
      delta: DeltaX,
      path: ['countries', '10', 'population'],
      type: DELTA_TYPE.MODIFIED,
      deepType: DELTA_TYPE.ADDED,
    },
    { delta: DeltaX, path: ['countries', '10', 'xxx'], type: DELTA_TYPE.MODIFIED, deepType: DELTA_TYPE.UNCHANGED },
    { delta: DeltaX, path: ['countries', '11'], type: DELTA_TYPE.DELETED, deepType: DELTA_TYPE.DELETED },
    { delta: DeltaX, path: ['countries', '11', 'name'], type: DELTA_TYPE.DELETED, deepType: DELTA_TYPE.DELETED },
    { delta: DeltaX, path: ['countries', '11', 'unasur'], type: DELTA_TYPE.DELETED, deepType: DELTA_TYPE.DELETED },
  ];

  for (const { delta, path, type, deepType } of cases) {
    expect(getDeltaType(delta, path)).toBe(type);
    expect(getDeltaType(delta, path, { deep: true })).toBe(deepType);

    expect(getDeltaType(delta, path.join('.'))).toBe(type);
    expect(getDeltaType(delta, path.join('.'), { deep: true })).toBe(deepType);
  }
});
