
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
  var [ first, second ] = args;

  // single argument, ( object | array | string )
  if ( args.length === 1 ) {
    let
      firstType = typeof first,
      firstIsArray = Array.isArray( first );

    // arg is a single object of key value pairs
    if ( firstType !== 'string' && !firstIsArray ) {
      return getKeyValueFromObject( first );
    }

    // argument is a single array
    if ( firstIsArray ) {
      return [ first, intRange( 0, first.length )];
    }

    // argument is a 'single string'
    return [ args, [ 0 ]];
  }

  // two arguments, ( startIndex, [ names ])
  if ( args.length === 2 && Array.isArray( second )) {
    return [ second, intRange( first, second.length + first )];
  }

  // "unlimited" args, ( ...names );
  return [ args, intRange( 0, args.length )];
}
