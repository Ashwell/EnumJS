
/**
 * possible argument signatures
 *  $enum( ...names )
 *  $enum({ name: value })
 *  $enum([ names ])
 *  $enum( startIndex, [ names ])
 *
 * transformed to [ keys<Array>, [values<Array>] ]
**/
var
  intRange,
  getKeyValueFromObject,

intRange = function( first, last ) {
  var
    curr = typeof first === 'number' ? first : 0,
    arr = [ curr ];

  while ( last > ++curr ) {
    arr.push( curr );
  }

  return arr;
};

getKeyValueFromObject = function( object ) {
  var
    keys = [],
    values = [];

  Object.keys( object ).forEach( key => {
    keys.push( key );
    values.push( object[ key ]);
  });

  return [ keys, values ];
};

export default function argParse( ...args ) {
  // single argument, ( object | array | string )
  if ( args.length === 1 ) {
    // arg is a single object of key value pairs
    if ( Object.isObject( args[ 0 ])) {
      return getKeyValueFromObject( args[ 0 ]);
    }

    // either [ names ] or 'single string' or just wrong
    return [ args ];
  }

  // two arguments, ( startIndex, [ names ])
  if ( args.length === 2 ) {
    return [ args[ 1 ], intRange( args[ 0 ], args[ 1 ].length )];
  }

  // "unlimited" args, ( ...names );
  return [ args, intRange( 0, args.length )];
}
