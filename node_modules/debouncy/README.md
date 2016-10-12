[![NPM Version](http://img.shields.io/npm/v/debouncy.svg?style=flat)](https://npmjs.org/package/debouncy)
[![Build Status](http://img.shields.io/travis/royriojas/debouncy.svg?style=flat)](https://travis-ci.org/royriojas/debouncy)

# debouncy
Yet another debounce implementation with 0 dependencies

## Install

```bash
npm i --save debouncy
```

## Usage
```javascript
var debouncy = require('debouncy');
```

### signature
```javascript
function debouncy(fnToDebounce: Function, threshold:Number, [ctx:Object], [immediate:Boolean]):Function
```

- **fnToDebounce**: Function
  The function to debounce
- **threshold**: Number
  The number of milliseconds before actually executing the `fnToDebounce` since the last call to the debounced function.
- **ctx**: Object
  The this object inside the debounced function. If none specified will try to use the ctx of the invocator.
- **immediate**: Boolean
  If true, the function will be executed on the leading edge.

## Example

```javascript
var debouncy = require('debouncy');

var debouncedFn = debouncy(function () { console.log('I am called') }, 200);
debouncedFn();
// after 200ms
// output: I am called
var ctx = {
  name: 'some obj';
}
var debouncedFn = debouncy(function () { console.log('I am called from', this.name) }, 200, ctx);
debouncedFn();
// after 200ms
// output: I am called from some obj

var debouncedFn = debouncy(function () { console.log('I am called') }, 200, null, true /*immediate*/);
debouncedFn();
// immediately
// output: I am called
// other calls will have to wait 200ms before the last execution
```

## Changelog
[changelog](./changelog.md)

## License
[MIT](./LICENSE)
