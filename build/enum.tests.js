'use strict';

var test = require('tape');
test = 'default' in test ? test['default'] : test;

var babelHelpers_typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj;
};

var babelHelpers_toConsumableArray = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  } else {
    return Array.from(arr);
  }
};

var define;
var defaults = {
  configurable: false,
  enumerable: true,
  writable: false
};
define = function define(instance, name, value) {
  var traits = arguments.length <= 3 || arguments[3] === undefined ? {} : arguments[3];

  traits = Object.assign({}, defaults, traits, { value: value });
  return Object.defineProperty(instance, name, traits);
};

var define$1 = define;

/**
 * possible argument signatures
 *  $enum( ...names )
 *  $enum({ name: value })
 *  $enum([ names ])
 *  $enum( startIndex, [ names ])
 *
 * transformed to [ keys<Array>, [values<Array>] ]
**/
var getKeyValueFromObject;
var intRange = function intRange(first, last) {
  var curr = typeof first === 'number' ? first : 0,
      arr = [curr];

  while (last > ++curr) {
    arr.push(curr);
  }

  return arr;
};
getKeyValueFromObject = function getKeyValueFromObject(object) {
  var keys = [],
      values = [];

  Object.keys(object).forEach(function (key) {
    keys.push(key);
    values.push(object[key]);
  });

  return [keys, values];
};

function argParse() {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  var first = args[0];
  var second = args[1];

  // single argument, ( object | array | string )

  if (args.length === 1) {
    var firstType = typeof first === 'undefined' ? 'undefined' : babelHelpers_typeof(first),
        firstIsArray = Array.isArray(first);

    // arg is a single object of key value pairs
    if (firstType !== 'string' && !firstIsArray) {
      return getKeyValueFromObject(first);
    }

    // argument is a single array
    if (firstIsArray) {
      return [first, intRange(0, first.length)];
    }

    // argument is a 'single string'
    return [args, [0]];
  }

  // two arguments, ( startIndex, [ names ])
  if (args.length === 2 && Array.isArray(second)) {
    return [second, intRange(first, second.length + first)];
  }

  // "unlimited" args, ( ...names );
  return [args, intRange(0, args.length)];
}

function createProto(keys, values, constructor) {
  var proto = {};

  define$1(proto, 'length', keys.length);
  define$1(proto, 'keys', keys, { enumerable: false });
  define$1(proto, 'values', values, { enumerable: false });
  define$1(proto, 'toString');
  define$1(proto, Symbol.toStringTag, function () {}, { enumerable: false });
  define$1(proto, Symbol.iterator);

  proto.constructor = constructor;
  return Object.freeze(proto);
}

var factory;

factory = function factory(keys, values) {
  //  console.log( 'factory arguments: keys, values' );
  //  console.log( keys );
  //  console.log( values );
  var Enum = function Enum() {
    var _this = this;

    keys.forEach(function (key, index) {
      return define$1(_this, key, values[index]);
    });
  };

  Enum.prototype = createProto(keys, values, Enum);
  return Object.freeze(new Enum());
};

function $enum() {
  return factory.apply(undefined, babelHelpers_toConsumableArray(argParse.apply(undefined, arguments)));
}

var assign$1;

assign$1 = function assign(enumInstance, assignTo) {
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = enumInstance[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var _step$value = _step.value;
      var key = _step$value.key;
      var value = _step$value.value;

      define$1(assignTo, key, value);
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }
};

var assign$2 = assign$1;

var assignTo;

assignTo = function assignTo(assignee) {
  for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  assign($enum.apply(undefined, babelHelpers_toConsumableArray(argParse.apply(undefined, args))), assignee);
};

var assignTo$1 = assignTo;

test('proper default and named exports', function (assert) {
  assert.equal(typeof $enum === 'undefined' ? 'undefined' : babelHelpers_typeof($enum), 'function', '$enum is a function');
  assert.equal(typeof assign$2 === 'undefined' ? 'undefined' : babelHelpers_typeof(assign$2), 'function', 'assign is a function and named export');
  assert.equal(typeof assignTo$1 === 'undefined' ? 'undefined' : babelHelpers_typeof(assignTo$1), 'function', 'assignTo is a function and named export');
  assert.end();
});

test.skip('assign takes enum instance', function (assert) {
  assert.fail('todo');
});

test.skip('assignTo takes enum arguments', function (assign) {
  assign.fail('todo');
});

var descriptor;
var addValue;
descriptor = {
  configurable: false,
  enumerable: true,
  writable: false
};

addValue = function addValue(value) {
  return Object.assign(descriptor, { value: value });
};

/* constructor tests */
test('$enum( ...names )', function (assert) {
  var i = 0,
      args = ['zero', 'one', 'two', 'three'],
      myEnum = $enum.apply(undefined, args);

  for (var prop in myEnum) {
    if (myEnum.hasOwnProperty(prop)) {
      assert.deepEqual(Object.getOwnPropertyDescriptor(myEnum, prop), addValue(i), 'property ' + prop + ' has enum descriptor with value ' + i);
      i++;
    }
  }

  assert.equal(i, args.length, 'iterated properties count matches argument list length');
  assert.end();
});

test('$enum( { name: value })', function (assert) {
  var length = 0,
      argument = {
    1: 'a',
    2: 'b',
    3: 'c',
    4: 'd',
    5: 'e'
  },
      myEnum = $enum(argument);

  for (var prop in argument) {
    if (argument.hasOwnProperty(prop)) {
      var value = argument[prop];
      assert.equals(value, myEnum[prop], 'enum value mirrors object based argument, ' + prop + ':' + value);
      length++;
    }
  }

  for (var prop in myEnum) {
    if (myEnum.hasOwnProperty(prop)) {
      assert.deepEqual(Object.getOwnPropertyDescriptor(myEnum, prop), addValue(argument[prop]), 'property ' + prop + ' has enum descriptor with value ' + myEnum[prop]);
      length--;
    }
  }

  assert.equal(length, 0, 'iterated properties count matches for both argument and enum');
  assert.end();
});

test('$enum([ names ])', function (assert) {
  var i = 0,
      args = ['zero', 'one', 'two'],
      myEnum = $enum(args);

  for (var prop in myEnum) {
    if (myEnum.hasOwnProperty(prop)) {
      assert.deepEqual(Object.getOwnPropertyDescriptor(myEnum, prop), addValue(i), 'property ' + prop + ' has enum descriptor with value ' + i);
      i++;
    }
  }

  assert.equals(i, args.length, 'iterated properties count matches argument length');
  assert.end();
});

test('$enum( startIndex, [ names ])', function (assert) {
  var i = 0,
      startIndex = 2,
      enumValues,
      enumList = ['two', 'three', 'four', 'five', '6'],
      myEnum = $enum(startIndex, enumList);

  enumValues = {
    two: 2,
    three: 3,
    four: 4,
    five: 5,
    6: 6
  };

  for (var prop in myEnum) {
    if (myEnum.hasOwnProperty(prop)) {
      var value = enumValues[prop];
      assert.deepEqual(Object.getOwnPropertyDescriptor(myEnum, prop), addValue(value), 'property ' + prop + ' has enum descriptor with value ' + value);
      i++;
    }
  }

  assert.equals(i, enumList.length, 'iterated properties count matches enum argument list');
  assert.end();
});
//# sourceMappingURL=enum.tests.js.map