(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.enumFactory = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

/*globals module */
!(function () {
  'use strict';

  var exports;

  if (typeof window !== 'undefined') {
    exports = window;
  } else if (typeof module !== 'undefined') {
    exports = module.exports;
  } else {
    console.warn('I don\'t know where to export to....Enums.js');
    exports = {};
  }

  exports.Enum = (function () {
    var Enum = function Enum(enums) {
      var i,
          keys = [],
          values = [],
          length = 0;

      //  if(!(enums instanceof Array)){
      //    throw new SyntaxError('Enum input must be an Array');
      //  }

      if (enums instanceof Array) {
        for (i = 0; i < enums.length; i++) {
          try {
            Object.defineProperty(this, enums[i], {
              configurable: false,
              enumerable: true,
              value: i,
              writable: false
            });
            ++length;
            values.push(i);
            keys.push(enums[i]);
          } catch (e) {
            throw new TypeError('Enum Constructor Failure, you must pass a set of unique keys.');
          }
        }
      } else if (enums instanceof Object) {
        for (i in enums) {
          if (enums.hasOwnProperty(i)) {
            if (values.lastIndexOf(enums[i]) !== -1) {
              throw new TypeError('Enum Constructor Failure, you must pass a unique value for each key');
            }
            try {
              Object.defineProperty(this, i, {
                configurable: false,
                enumerable: true,
                value: enums[i],
                writable: false
              });
              ++length;
              values.push(enums[i]);
              keys.push(i);
            } catch (e) {
              throw new TypeError('Enum Constructor Failure.');
            }
          }
        }
      }

      Object.defineProperty(this, 'length', {
        configurable: false,
        enumerable: false,
        value: length,
        writable: false
      });

      //    Object.defineProperty(this, 'keys', {
      //      configurable: false,
      //      enumerable:   false,
      //      value:        keys,
      //      writable:     false
      //    });
      //    Object.defineProperty(this, 'values', {
      //      configurable: false,
      //      enumerable:   false,
      //      value:        values,
      //      writable:     false
      //    });

      return Object.freeze(this);
    };

    // Prototype Functions
    Object.defineProperties(Enum.prototype, {
      /*'length':{
        configurable: false,
        enumerable:   false,
        get:          function () {
          var count = 0;
          for ( var prop in this ){
            ++count;
          }
          return count;
          //return this.keys.length;
        }
      },*/
      'keys': {
        configurable: false,
        enumerable: false,
        get: function get() {
          var keys = [];
          for (var prop in this) {
            if (this.hasOwnProperty(prop)) {
              keys.push(prop);
            }
          }
          return keys;
        }
      },
      'values': {
        configurable: false,
        enumerable: false,
        get: function get() {
          var values = [];
          for (var prop in this) {
            if (this.hasOwnProperty(prop)) {
              values.push(this[prop]);
            }
          }
          return values;
        }
      },
      'toString': {
        configurable: false,
        enumerable: false,
        writable: false,
        value: function value() {
          return '[object Enum]';
        }
      }
    });

    // Export
    return Enum;
  })();
})();

},{}]},{},[1])(1)
});