
import define from './define';

var
  stringReduce,
  jsonReduce;

stringReduce = function( str, key, index ) {
  return `${index === 0 ? str : str + ', '}${key}:${this.values[ index ]}`;
};

jsonReduce = function( obj, key, index ) {
  obj[ key ] = this.values[ index ];
  return obj;
};

/*eslint-disable func-style*/
export default function createProto( keys, values, constructor ) {
  /*eslint-enable func-style*/
  var proto = {};

  define( proto, 'length', keys.length );
  define( proto, 'keys', keys, { enumerable: false });
  define( proto, 'values', values, { enumerable: false });

  // toString
  ( function() {
    var stringCache = null;

    define( proto, 'toString', function() {
      if ( stringCache == null ) {
        stringCache = this.keys.reduce(
            stringReduce.bind( this ),
            '[ '
          ) + ' ]';
      }

      return stringCache;
    });
  })();

  //toJSON
  ( function() {
    var jsonCache = null;

    define( proto, 'toJSON', function() {
      if ( jsonCache == null ) {
        jsonCache = this.keys.reduce(
          jsonReduce.bind( this ),
          {}
        );
      }

      return jsonCache;
    });
  })();

  // Well known Symbols
  if ( Symbol.toStringTag ) {
    define( proto, Symbol.toStringTag, 'Enum' );
  }

  if ( Symbol.toPrimitive ) {
    define( proto, Symbol.toPrimitive, function( hint ) {
      switch ( hint ) {
        case 'number':
          return this.length;
        case 'string':
          return `[ ${this.keys.join( ', ' )} ]`;
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
  return Object.freeze( proto );
}
