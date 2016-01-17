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

  var assign = function assign(enumInstance, assignTo) {
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

  /**
   * possible argument signatures
   *  $enum( ...names )
   *  $enum({ name: value })
   *  $enum([ names ])
   *  $enum( startIndex, [ names ])
   *
   *  names can be strings or Symbols, except for when single object of own keys
   *
   * transformed to [ keys<Array>, [values<Array>] ]
  **/
  var intRange;
  var symbolsOrRange;
  var getKeyValueFromObject;
  intRange = function intRange(first, last) {
    var curr = typeof first === 'number' ? first : 0,
        arr = [curr];

    while (last > ++curr) {
      arr.push(curr);
    }

    return arr;
  };

  symbolsOrRange = function symbolsOrRange(list, first, last) {
    return babelHelpers_typeof(list[0]) === 'symbol' ? list : intRange(first, last);
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

  /*eslint func-style:0*/
  function argParse() {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var first = args[0];

    var second = args[1];
    var firstType = typeof first === 'undefined' ? 'undefined' : babelHelpers_typeof(first);

    // single argument, ( object | array | string | Symbol )
    if (args.length === 1) {
      var isArray = Array.isArray(first);

      // single symbol
      if (firstType === 'symbol') {
        return [args, args];
      }

      // single string
      if (firstType === 'string') {
        return [args, [0]];
      }

      // single array
      if (isArray) {
        return [first, symbolsOrRange(first, 0, first.length)];
      }

      // I guess it's an object
      return getKeyValueFromObject(first);
    }

    // two arguments, ( startIndex, [ names ])
    if (args.length === 2 && firstType === 'number' && Array.isArray(second)) {
      return [second, intRange(first, second.length + first)];
    }

    // "unlimited" args, ( ...names );
    return [args, symbolsOrRange(args, 0, args.length)];
  }

  var stringReduce;
  var jsonReduce;
  stringReduce = function stringReduce(str, key, index) {
    return '' + (index === 0 ? str : str + ', ') + key + ':' + this.values[index];
  };

  jsonReduce = function jsonReduce(obj, key, index) {
    obj[key] = this.values[index];
    return obj;
  };

  /*eslint-disable func-style*/
  function createProto(keys, values, constructor) {
    /*eslint-enable func-style*/
    var proto = {};

    define$1(proto, 'length', keys.length);
    define$1(proto, 'keys', keys, { enumerable: false });
    define$1(proto, 'values', values, { enumerable: false });

    // toString
    (function () {
      var stringCache = null;

      define$1(proto, 'toString', function () {
        if (stringCache == null) {
          stringCache = this.keys.reduce(stringReduce.bind(this), '[ ') + ' ]';
        }

        return stringCache;
      });
    })();

    //toJSON
    (function () {
      var jsonCache = null;

      define$1(proto, 'toJSON', function () {
        if (jsonCache == null) {
          jsonCache = this.keys.reduce(jsonReduce.bind(this), {});
        }

        return jsonCache;
      });
    })();

    // Well known Symbols
    if (Symbol.toStringTag) {
      define$1(proto, Symbol.toStringTag, 'Enum');
    }

    if (Symbol.toPrimitive) {
      define$1(proto, Symbol.toPrimitive, function (hint) {
        switch (hint) {
          case 'number':
            return this.length;
          case 'string':
            return '[ ' + this.keys.join(', ') + ' ]';
          default:
            return true;
        }
      }, { enumerable: false });
    }

    /*
    TODO fix missing regeneratorRuntime
    define( proto, Symbol.iterator, function*() {
      for ( let i = 0 ; i < this.length ; i++ ) {
        let
          key = this.keys[ i ],
          value = this.values[ i ];
         yield { key, value };
      }
    });
    */

    proto.constructor = constructor;
    return Object.freeze(proto);
  }

  /*eslint-disable func-style*/
  function stringifySymbol(symbol) {
    var symStr = symbol.toString();
    return symStr.slice(7, symStr.length - 1);
  }

  var factory;
  var $enum;
  factory = function factory(keys, values) {
    var Enum;
    //  console.log( 'factory arguments: keys, values' );
    //  console.log( keys );
    //  console.log( values );
    keys = babelHelpers_typeof(keys[0]) === 'symbol' ? keys.map(stringifySymbol) : keys;

    Enum = function Enum() {
      var _this = this;

      keys.forEach(function (key, index) {
        return define$1(_this, key, values[index]);
      });
    };

    Enum.prototype = createProto(keys, values, Enum);
    return Object.freeze(new Enum());
  };

  $enum = function $enum() {
    return factory.apply(undefined, babelHelpers_toConsumableArray(argParse.apply(undefined, arguments)));
  };

  var $enum$1 = $enum;

  var assignTo;

  assignTo = function assignTo(assignee) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    assign($enum$1.apply(undefined, args), assignee);
  };

  var assignTo$1 = assignTo;

  $enum$1.assign = assign;
  $enum$1.assignTo = assignTo$1;

  return $enum$1;

}));
//# sourceMappingURL=enum.umd.js.map