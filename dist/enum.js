(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.enumFactory = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.assignTo = exports.assign = undefined;

var _assign = require('./assign');

Object.defineProperty(exports, 'assign', {
  enumerable: true,
  get: function get() {
    return _assign.default;
  }
});

var _assignTo = require('./assign-to');

Object.defineProperty(exports, 'assignTo', {
  enumerable: true,
  get: function get() {
    return _assignTo.default;
  }
});

var _enum = require('./enum');

var _enum2 = _interopRequireDefault(_enum);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _enum2.default;

},{"./assign":4,"./assign-to":3,"./enum":7}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = argParse;

function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

/**
 * possible argument signatures
 *  $enum( ...names )
 *  $enum({ name: value })
 *  $enum([ names ])
 *  $enum( startIndex, [ names ])
 *
 * transformed to [ keys<Array>, [values<Array>] ]
**/
var intRange,
    getKeyValueFromObject,
    intRange = function intRange(first, last) {
  var curr = typeof first === 'number' ? first : 0,
      arr = [curr];

  while (last > ++curr) {
    arr.push(curr);
  }

  return arr;
};

getKeyValueFromObject = function (object) {
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
    var firstType = typeof first === 'undefined' ? 'undefined' : _typeof(first),
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

},{}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _argParse = require('./arg-parse');

var _argParse2 = _interopRequireDefault(_argParse);

var _enum = require('./enum');

var _enum2 = _interopRequireDefault(_enum);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var assignTo;

assignTo = function assignTo(assignee) {
  for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  assign(_enum2.default.apply(undefined, _toConsumableArray(_argParse2.default.apply(undefined, args))), assignee);
};

exports.default = assignTo;

},{"./arg-parse":2,"./enum":7}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _define = require('./define');

var _define2 = _interopRequireDefault(_define);

var _enum = require('./enum');

var _enum2 = _interopRequireDefault(_enum);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var assign;

assign = function (enumInstance, assignTo) {
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = enumInstance[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var _step$value = _step.value;
      var key = _step$value.key;
      var value = _step$value.value;

      (0, _define2.default)(assignTo, key, value);
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

exports.default = assign;

},{"./define":6,"./enum":7}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createProto;

var _define = require('./define');

var _define2 = _interopRequireDefault(_define);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createProto(keys, values, constructor) {
  var proto = {};

  (0, _define2.default)(proto, 'length', keys.length);
  (0, _define2.default)(proto, 'keys', keys, { enumerable: false });
  (0, _define2.default)(proto, 'values', values, { enumerable: false });
  (0, _define2.default)(proto, 'toString');
  (0, _define2.default)(proto, Symbol.toStringTag, function () {}, { enumerable: false });
  (0, _define2.default)(proto, Symbol.iterator);

  proto.constructor = constructor;
  return Object.freeze(proto);
}

},{"./define":6}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var define,
    defaults = {
  configurable: false,
  enumerable: true,
  writable: false
};

define = function (instance, name, value) {
  var traits = arguments.length <= 3 || arguments[3] === undefined ? {} : arguments[3];

  traits = Object.assign({}, defaults, traits, { value: value });
  return Object.defineProperty(instance, name, traits);
};

exports.default = define;

},{}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = $enum;

var _define = require('./define');

var _define2 = _interopRequireDefault(_define);

var _argParse = require('./arg-parse');

var _argParse2 = _interopRequireDefault(_argParse);

var _createProto = require('./create-proto');

var _createProto2 = _interopRequireDefault(_createProto);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var factory;

factory = function (keys, values) {
  //  console.log( 'factory arguments: keys, values' );
  //  console.log( keys );
  //  console.log( values );
  var Enum = function Enum() {
    var _this = this;

    keys.forEach(function (key, index) {
      return (0, _define2.default)(_this, key, values[index]);
    });
  };

  Enum.prototype = (0, _createProto2.default)(keys, values, Enum);
  return Object.freeze(new Enum());
};

function $enum() {
  return factory.apply(undefined, _toConsumableArray(_argParse2.default.apply(undefined, arguments)));
}

},{"./arg-parse":2,"./create-proto":5,"./define":6}]},{},[1])(1)
});