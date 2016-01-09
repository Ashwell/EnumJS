(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.$enum = factory());
}(this, function () { 'use strict';

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

  $enum.assign = assign$2;
  $enum.assignTo = assignTo$1;

  return $enum;

}));
//# sourceMappingURL=enum.umd.js.map