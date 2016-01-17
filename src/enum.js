
import define from './define';
import argParse from './arg-parse';
import createProto from './create-proto';
import stringifySymbol from './stringify-symbol';

var
  factory,
  $enum;

factory = function( keys, values ) {
  var Enum;
//  console.log( 'factory arguments: keys, values' );
//  console.log( keys );
//  console.log( values );
  keys = typeof keys[0] === 'symbol' ? keys.map( stringifySymbol ) : keys;

  Enum = function() {
    keys.forEach(( key, index ) => define( this, key, values[ index ]));
  };

  Enum.prototype = createProto( keys, values, Enum );
  return Object.freeze( new Enum());
};

$enum = function( ...args ) {
  return factory( ...argParse( ...args ));
};

export default $enum;
