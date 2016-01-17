EnumJS
======
A simple way to create an immutable enumerable list aka enum.
Still a WIP use at your own risk

[![Codacy Badge](https://www.codacy.com/project/badge/392d48a4b14f43f3853d534e34bbdd87)](https://www.codacy.com/public/RyanBogle/EnumJS)
[![Code Climate](https://codeclimate.com/github/Ashwell/EnumJS.png)](https://codeclimate.com/github/Ashwell/EnumJS)


Usage
======
ES6
```javascript
import $enum { assign, assignTo } from 'enumjs';

var myEnum = $enum( 'a', 'b', 'c' );
```

NodeJS
```javascript
var $enum = require( 'enumjs' );
  
$enum
// { [Function: $enum] assign: [Function: assign], assignTo: [Function: assignTo] }

var myEnum = $enum( 'one', 'two', 'three' );
```

As a browser script
```javascript
// $enum will exist on the window object after the script is loaded
var myEnum = $enum(['one', 'two', 'three']);
```

Constructor Patterns
======
There are several ways to create an enum, as described below
```javascript
/**
 * possible argument signatures
 *  $enum( ...names )
 *  $enum([ names ])
 *  $enum({ name:value })
 *  $enum( startIndex, [ names ])
**/
```


### As an argument list ###
#### `$enum( ...names );` ####

```javascript
var myEnum = $enum( 'zero', 'one', 'two' );

console.log( myEnum );
// -> Enum { zero: 0, one: 1, two: 2 }
```

### As an array ###
#### `$enum([ names ]);` ####

```javascript
var myEnum = $enum([ 'zero', 'one', 'two' ]);

console.log( myEnum );
// -> Enum { zero: 0, one: 1, two: 2 }
```

### As an object of own keys ###
#### `$enum({ key:value });` ####

```javascript
var myEnum = $enum({
  PLAY: 'play',
  STOP: 'stop',
  SKIP: 'next'
});

console.log( myEnum );
// -> Enum { PLAY: 'play', STOP: 'stop', SKIP: 'next' }
```

### As a starting index and array of names ###
#### `$enum( startIndex, [ names ]);` ####

```javascript
var myEnum = $enum( 1, [ 'one', 'two', 'three' ]);

console.log( myEnum );
// -> Enum Enum { one: 1, two: 2, three: 3 }
```

Assign Functions
======
TODO

Come back for more updates!

