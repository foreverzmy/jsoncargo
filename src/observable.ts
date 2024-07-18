import type { PropertyPath as LodashPropertyPath } from 'lodash';
import cloneDeep from 'lodash/cloneDeep';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import isEqual from 'lodash/isEqual';
import noop from 'lodash/noop';
import setWith from 'lodash/setWith';
import toPath from 'lodash/toPath';
import unset from 'lodash/unset';

export type PropertyPath = LodashPropertyPath;

export type WatchCallback = (value: any) => void;

export interface WatchOptions {
  leading?: boolean;
}

export type OffWatch = () => void;

// Helper function to determine if one path is a parent of another
const isParentPath = (parent: string[], path: string[]) =>
  parent.length < path.length && isEqual(parent, path.slice(0, parent.length));

export class ObservableObject<T extends { [key: string]: any }> {
  #target: T;
  #watchers = new Map<string[], Set<WatchCallback>>();
  #updated = false;
  #clonedTarget: T;

  constructor(target: T) {
    this.#target = cloneDeep(target);
    this.#clonedTarget = cloneDeep(this.#target);
  }

  get value() {
    if (this.#updated) {
      this.#clonedTarget = cloneDeep(this.#target);
      this.#updated = false;
    }
    return this.#clonedTarget;
  }

  set(values: T): T;
  set<V = any>(path: PropertyPath, value: V, customizer?: (nsValue: any, key: string, nsObject: T) => any): V;
  set<V = any>(...args: any[]) {
    if (args.length === 1) {
      const values = args[0];
      if (isEqual(this.value, values)) {
        return this.get();
      }

      const oldValue = this.value;
      this.#target = cloneDeep(values);
      this.#updated = true;
      new Set([...Object.keys(values), ...Object.keys(oldValue)]).forEach((key) => {
        if (!isEqual(values[key], oldValue[key])) {
          this.#notifyWatchers([key], values[key], oldValue[key]);
        }
      });
      return this.get();
    }

    const [path, value, customizer] = args;

    const pathArr = toPath(path);
    const oldValue = get(this.#target, pathArr);
    if (isEqual(value, oldValue)) {
      return value;
    }
    this.#updated = true;
    setWith(this.#target, path, value, customizer);
    this.#notifyWatchers(pathArr, value, oldValue);
    return this.get<V>(pathArr);
  }

  unset = <V = any>(path: PropertyPath) => {
    const pathArr = toPath(path);
    const oldValue = get(this.#target, pathArr);
    if (unset(this.#target, pathArr)) {
      this.#updated = true;
      this.#notifyWatchers(pathArr, undefined, oldValue);
      return oldValue as V;
    }
  };

  get(): T;
  get<V>(path: PropertyPath): V;
  get<V = any>(path?: PropertyPath) {
    if (!path || isEmpty(path)) {
      return this.value;
    }
    const value = get(this.#target, path);
    return cloneDeep(value) as V;
  }

  #notifyWatchers(path: string[], newValue: any, oldValue: any) {
    for (const [watchPath, keyWatches] of this.#watchers) {
      if (watchPath.length === 1 && watchPath[0] === '*') {
        // root watch
        keyWatches.forEach((cb) => cb(this.get()));
        continue;
      }
      if (isParentPath(watchPath, path)) {
        // parent watch
        keyWatches.forEach((cb) => cb(this.get(watchPath)));
        continue;
      }
      if (isEqual(watchPath, path)) {
        keyWatches.forEach((cb) => cb(this.get(watchPath)));
        continue;
      }
      if (isParentPath(path, watchPath)) {
        // child watch
        const subPath = watchPath.slice(path.length, watchPath.length);

        const oldChildValue = get(oldValue, subPath);
        const newChildValue = get(newValue, subPath);
        if (!isEqual(newChildValue, oldChildValue)) {
          keyWatches.forEach((cb) => cb(newChildValue));
        }
      }
    }
  }

  watch = (path: PropertyPath, callback: WatchCallback, options?: WatchOptions): OffWatch => {
    const pathArr = toPath(path);
    if (pathArr.length === 0) {
      console.warn('ObservableObject watch: not a valid path');
      return noop;
    }
    if (options?.leading) {
      callback(this.get(path));
    }
    const keys = [...this.#watchers.keys()];
    const exists = keys.find((v) => isEqual(v, pathArr));
    if (exists && this.#watchers.has(exists)) {
      this.#watchers.get(exists)?.add(callback);
    } else {
      this.#watchers.set(pathArr, new Set([callback]));
    }

    return () => {
      this.#watchers.get(pathArr)?.delete(callback);
    };
  };
}
