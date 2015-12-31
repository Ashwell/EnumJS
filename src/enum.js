
import define from './define';

var Enum;

Enum = function( enums ) {
  var
    i,
    keys = [],
    values = [],
    length = 0;

  if ( enums instanceof Array ) {
    for ( i = 0 ; i < enums.length ; i++ ) {
      try {

        define( this, enums[ i ], i);
        ++length;
        values.push( i );
        keys.push( enums[ i ]);

      } catch ( e ) {
        throw new TypeError('Enum Constructor Failure, you must pass a set of unique keys.');
      }
    }
  } else if ( enums instanceof Object ) {
    for ( i in enums ) {
      if ( enums.hasOwnProperty(i) ) {
        if ( values.lastIndexOf(enums[i]) !== -1 ) {
          throw new TypeError('Enum Constructor Failure, you must pass a unique value for each key');
        }
        try {

          define( this, i, enums[ i ]);
          ++length;
          values.push( enums[ i ]);
          keys.push( i );

        } catch (e) {
          throw new TypeError('Enum Constructor Failure.');
        }
      }
    }
  }

  define( this, 'length', length, { enumerable: false });
  /*
  Object.defineProperty(this, 'length', {
    configurable: false,
    enumerable:   false,
    value:        length,
    writable:     false
  });
  */

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

  return Object.freeze( this );
};

// Prototype Functions
Object.defineProperties( Enum.prototype, {
  /*length: {
    configurable: false,
    enumerable: false,
    get: function() {
      var count = 0;
      for ( var prop in this ){
        ++count;
      }
      return count;
      //return this.keys.length;
    }
  },*/
  keys: {
    configurable: false,
    enumerable: false,
    get: function() {
      var keys = [];
      for ( let prop in this ){
        if ( this.hasOwnProperty(prop) ){
          keys.push(prop);
        }
      }
      return keys;
    }
  },
  values: {
    configurable: false,
    enumerable: false,
    get: function() {
      var values = [];
      for ( let prop in this ){
        if ( this.hasOwnProperty(prop) ){
          values.push(this[prop]);
        }
      }
      return values;
    }
  },
  toString: {
    configurable: false,
    enumerable: false,
    writable: false,
    value: function() { return '[object Enum]'; }
  }
});

export default Enum;
