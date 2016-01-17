
import test from 'tape';
import $enum from '../src/api';

// Properties
// length
test( 'has prototype property, length', function( assert ) {
  // todo
  assert.end();
});
// keys
test( 'has prototype property, keys', function( assert ) {
  // todo
  assert.end();
});
// values
test( 'has prototype property, values', function( assert ) {
  // todo
  assert.end();
});

// Methods
// toString
test( 'has prototype function, toString', function( assert ) {
  // todo
  assert.end();
});
// toJSON
test( 'has prototype function, toJSON', function( assert ) {
  // todo
  assert.end();
});
test( 'toJSON is reflexive with object style constructor', function( assert ) {
  var
    myEnum = $enum( 1, [ 'one', 'two', 'three' ]),
    fromJSON = $enum( JSON.parse( JSON.stringify( myEnum )));

  assert.deepEqual( myEnum, fromJSON, 'created enum deeply equals original' );
  assert.end();
});

// Symbols
//  .toStringTag
test.skip( 'has prototype symbol, toStringTag', function( assert ) {
  // todo
});
//  .toPrimitive
test.skip( 'has prototype symbol, toPrimitive', function( assert ) {
  // todo
});
//  .iterator
test.skip( 'has prototype symbol, iterator', function( assert ) {
  // todo
});
