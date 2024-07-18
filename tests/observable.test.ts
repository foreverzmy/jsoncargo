import { expect, mock, test } from 'bun:test';
import { ObservableObject } from '../src';

test('ObservableObject get', () => {
  const obj = {
    a: { b: 123 },
    c: [{ x: 1 }, { y: 2 }, { z: 3 }],
  };
  const oobj = new ObservableObject(obj);

  expect(oobj.get()).toEqual(obj);
  expect(oobj.get<any>('a')).toEqual(obj.a);
  expect(oobj.get<any>('a.b')).toEqual(obj.a.b);
  expect(oobj.get<any>('c')).toEqual(obj.c);
  expect(oobj.get<any>('c.0')).toEqual(obj.c[0]);
  expect(oobj.get<any>('c.[1].[y]')).toEqual(obj.c[1].y);
  expect(oobj.get<any>('c.[2].[y]')).toBeUndefined();
});

test('ObservableObject set', () => {
  const obj = {
    a: { b: 123 },
    c: [{ x: 1 }, { y: 2 }, { z: 3 }],
  };

  const set: Record<string, any> = {
    a: { c: 'hello' },
    'a.b': 234,
    'a.c': 'hello world',
    'c.[0].x': 2,
    'c.[0].y': 1,
    'c.[1].x': 3,
    'c.[2].x': 3,
  };

  const oobj = new ObservableObject<any>(obj);

  Object.entries(set).forEach(([key, target]) => {
    oobj.set(key, target);
    expect(oobj.get(key)).toEqual(target);
  });

  expect(oobj.value).toEqual({
    a: { b: 234, c: 'hello world' },
    c: [
      { x: 2, y: 1 },
      { x: 3, y: 2 },
      { z: 3, x: 3 },
    ],
  });
});

test('ObservableObject watch', () => {
  const obj = {
    a: { b: 123 },
    c: [{ x: 1 }, { y: 2 }, { z: 3 }],
    d: {},
  };

  const set: Record<string, any> = {
    a: { c: 'hello' },
    'a.b': 234,
    'a.c': 'hello world',
    'c.[0].x': 2,
    'c.[0].y': 1,
    'c.0.y': 1,
    'c.1.x': 3,
    'c.[2].x': 3,
    'd.a': 1,
    'd.b': 2,
    'd.c': { x: 1 },
    'd.c.y': 2,
    'd.c.x': 3,
  };

  const oobj = new ObservableObject<any>(obj);

  const fn1 = mock(() => {});
  oobj.watch('*', fn1);

  const fn2 = mock(() => {});
  oobj.watch('a', fn2);

  const fn3 = mock(() => {});
  oobj.watch('a.c', fn3);

  const fn4 = mock(() => {});
  oobj.watch('c.0', fn4);

  const fn5 = mock(() => {});
  oobj.watch('d.c.x', fn5);

  Object.entries(set).forEach(([key, target]) => {
    oobj.set(key, target);
    expect(oobj.get(key)).toEqual(target);
  });

  oobj.set('d.c', { x: 4, y: 2 });
  oobj.set('d.c', { x: 5, y: 2 });

  expect(oobj.value).toEqual({
    a: { b: 234, c: 'hello world' },
    c: [
      { x: 2, y: 1 },
      { x: 3, y: 2 },
      { z: 3, x: 3 },
    ],
    d: {
      a: 1,
      b: 2,
      c: {
        x: 5,
        y: 2,
      },
    },
  });

  oobj.unset('d.c');

  expect(oobj.value).toEqual({
    a: { b: 234, c: 'hello world' },
    c: [
      { x: 2, y: 1 },
      { x: 3, y: 2 },
      { z: 3, x: 3 },
    ],
    d: {
      a: 1,
      b: 2,
    },
  });
  expect(fn1).toHaveBeenCalledTimes(Object.keys(set).length + 2);
  expect(fn2).toHaveBeenCalledTimes(3);
  expect(fn3).toHaveBeenCalledTimes(2);
  expect(fn4).toHaveBeenCalledTimes(2);
  expect(fn5).toHaveBeenCalledTimes(5);
});

test('ObservableObject customizer set', () => {
  const obj = {
    a: { b: 123 },
  };

  const oobj = new ObservableObject<any>(obj);

  oobj.set('a.1', 2);

  oobj.set('b.0', 'item0');
  oobj.set('b.1', 'item1');

  const customizer = (nsValue: any, key: string, nsObject: any) => {
    if (typeof nsValue !== 'undefined') {
      return nsValue;
    }
    if (key === 'c') {
      return {};
    }
  };

  oobj.set('c.0', 'item0', customizer);
  oobj.set('c.1', 'item1', customizer);

  expect(oobj.value).toEqual({
    a: { b: 123, 1: 2 },
    b: ['item0', 'item1'],
    c: {
      '0': 'item0',
      '1': 'item1',
    },
  });
});

test('ObservableObject set values', () => {
  const obj = {
    a: { b: 123 },
    c: [{ x: 1 }, { y: 2 }, { z: 3 }],
  };

  const oobj = new ObservableObject(obj);

  const fn1 = mock(() => {});
  const fn2 = mock(() => {});
  const fn3 = mock(() => {});
  const fn4 = mock(() => {});
  oobj.watch('*', fn1);
  oobj.watch('a', fn2);
  oobj.watch('a.b', fn3);
  oobj.watch('c', fn4);
  oobj.watch('c.0.x', fn4);
  oobj.watch('c.1.y', fn4);
  oobj.watch('c.2.z', fn4);

  oobj.set({
    ...obj,
    a: { b: 234 },
  });

  oobj.set({
    ...obj,
    a: { b: 234 },
  });

  oobj.set({
    ...obj,
    a: { b: 345 },
  });

  expect(fn1).toHaveBeenCalledTimes(2);
  expect(fn2).toHaveBeenCalledTimes(2);
  expect(fn3).toHaveBeenCalledTimes(2);
  expect(fn4).toHaveBeenCalledTimes(0);

  expect(oobj.value).toEqual({
    a: { b: 345 },
    c: [{ x: 1 }, { y: 2 }, { z: 3 }],
  });
});
