
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
var
  intRange,
  symbolsOrRange,
  getKeyValueFromObject;

intRange = function( first, last ) {
  var
    curr = typeof first === 'number' ? first : 0,
    arr = [ curr ];

  while ( last > ++curr ) {
    arr.push( curr );
  }

  return arr;
};

symbolsOrRange = function( list, first, last ) {
  return typeof list[ 0 ] === 'symbol' ? list : intRange( first, last );
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

/*eslint func-style:0*/
export default function argParse( ...args ) {
  var
    [ first, second ] = args,
    firstType = typeof first;

  // single argument, ( object | array | string | Symbol )
  if ( args.length === 1 ) {
    let isArray = Array.isArray( first );

    // single symbol
    if ( firstType === 'symbol' ) {
      return [ args, args ];
    }

    // single string
    if ( firstType === 'string' ) {
      return [ args, [ 0 ]];
    }

    // single array
    if ( isArray ) {
      return [ first, symbolsOrRange( first, 0, first.length ) ];
    }

    // I guess it's an object
    return getKeyValueFromObject( first );
  }

  // two arguments, ( startIndex, [ names ])
  if ( args.length === 2 && firstType === 'number' && Array.isArray( second )) {
    return [ second, intRange( first, second.length + first ) ];
  }

  // "unlimited" args, ( ...names );
  return [ args, symbolsOrRange( args, 0, args.length ) ];
}
