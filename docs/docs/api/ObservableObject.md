---
pageType: doc
---
# ObservableObject

The `ObservableObject` class provides a mechanism to observe changes to the properties of an object. It allows setting values on the object and watching for changes at specific paths, including nested properties, making it suitable for complex state management scenarios.

## PropertyName

```ts
type PropertyPath = Many<PropertyName>;
type Many<T> = T | readonly T[];
type PropertyName = string | number | symbol;
```

`PropertyName` refers to the various ways you can specify a property name when using methods that deal with object properties.

It uses lodash's API internally, so its behavior is consistent with [lodash.get](https://lodash.com/docs/4.17.15#get) and [lodash.setWith](https://lodash.com/docs/4.17.15#setWith) and [lodash.toPath](https://lodash.com/docs/4.17.15#toPath) methods when operating the target objects.


## Class Definition

### Constructor

Creates a new `ObservableObject` instance.

```ts
constructor(target: T)
```

* `target`: The initial object to observe. This object is **deeply cloned** to avoid direct mutations.

### Properties

* `value`: Returns a **deep clone** of the target object.

### Methods

#### `set`

Sets a value at a specific path within the object and notifies watchers if the value changes.

```ts
set(values: T): T;
set<V = any>(path: PropertyPath, value: V, customizer?: (nsValue: any, key: string, nsObject: T) => any): V;
```

* `value`: Set the full object to replace `target` if just only one parameters.
* `path`: The path where the value should be set (can be a string or an array of strings).
* `value`: The new value to set at the specified path.
* `customizer` (optional): The function to customize assigned values. 

Returns the new value at the specified path.

#### `get`

Gets the value at a specific path or the entire object if no path is provided.

```ts
get(): T;
get<V>(path: PropertyPath): V;
```

* `path` (optional): The path to retrieve the value from (can be a string or an array of strings).

Returns the **deep clone value** at the specified path or a **deep clone** of the entire object if no path is provided.

#### `unset`

Delete the value at a specific path.

```ts
unset<V = any>(path: PropertyPath): V | undefined;
```

* `path`: The path to delete.

Returns the value at the specified path to delete, if the path not exists, it will be `undefined`.

#### `watch`

Watches for changes at a specific path and executes a callback when changes occur.

```ts
interface WatchOptions {
 leading?: boolean;
}

type WatchCallback = (value: any) => void;

type OffWatch = () => void;

watch(path: PropertyPath, callback: WatchCallback, options?: WatchOptions): OffWatch;
```

* `path`: The path to watch for changes.
* `callback`: The function to execute when a change occurs.
* `options` (optional): An object with the following optional properties:
  * `leading`: If true, the callback is executed immediately with the current value at the path.

Returns a function to unsubscribe from the watch.

## Usage

### Creating an ObservableObject

```ts
import { ObservableObject } from 'jsoncargo';

const obj = {
  user: {
    name: 'Alice',
    age: 25
  },
  items: ['item1', 'item2']
};

const observable = new ObservableObject(obj);

```

### Getting Values

```ts
console.log(observable.get()); // Returns the entire object
console.log(observable.get('user.name')); // Returns 'Alice'
```

### Setting Values

```ts
observable.set('user.age', 26);
console.log(observable.get('user.age')); // Returns 26

observable.set({ ...obj, items: ['item'] });
console.log(observable.get('items.0')); // Returns 'item'
```

> Note: If the value being set is equal to the existing value, watchers will not be triggered.

### Delete Path and Value

```ts
observable.unset('user.age');
console.log(observable.get('user.age')); // Returns undefined
```

### Watching for Changes

```ts
const unsubscribe = observable.watch('user.age', (newValue) => {
  console.log('User age changed to:', newValue);
}, { leading: true });

observable.set('user.age', 27); // Logs: 'User age changed to: 27'

// To unsubscribe from watching
unsubscribe();
```

### Watching Nested Properties

```ts
observable.watch('user', (newValue) => {
  console.log('User object changed:', newValue);
});

observable.set('user.name', 'Bob'); // Logs: 'User object changed: { name: 'Bob', age: 27 }'
```

## Advanced Usage

### Root Watcher

To watch for any change in the object:

```ts
observable.watch('*', (newValue) => {
  console.log('Object changed:', newValue);
});
```

### Watching Parent and Child Paths

The `ObservableObject` automatically detects changes to parent and child paths. If a parent path is watched, any change to a child path will trigger the callback.

```ts
observable.watch('user', (newValue) => {
  console.log('User object changed:', newValue);
});

observable.set('user.name', 'Charlie'); // Logs: 'User object changed: { name: 'Charlie', age: 27 }'
observable.set('user.name', 'Charlie'); // No watch, auto
```

## Conclusion

The `ObservableObject` class provides a powerful way to manage and react to changes within an object. It supports deep observation of nested properties, making it suitable for complex state management scenarios. Watchers will not be triggered if the new value is equal to the old value, ensuring efficient change detection.
