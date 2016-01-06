
import define from './define';
import argParse from './arg-parse';
import createProto from './create-proto';

var factory;

factory = function( keys, values ) {
//  console.log( 'factory arguments: keys, values' );
//  console.log( keys );
//  console.log( values );
  var Enum = function() {
    keys.forEach(( key, index ) => define( this, key, values[ index ]));
  };

  Enum.prototype = createProto( keys, values, Enum );
  return Object.freeze( new Enum());
};

export default function $enum( ...args ) {
  return factory( ...argParse( ...args ));
}
