
import test from 'tape';
import $enum, { assign } from '../src/api';

var args = [ Symbol( 'one' ), Symbol( '2' ), Symbol( 'three' ) ];

test.skip( 'assign takes enum instance', function( assert ) {
  var
    assignee = {},
    myEnum = $enum( args );

  assign( myEnum, assignee );

  assert.deepEqual(
    Reflect.ownKeys( assignee ),
    args,
    'own keys of assignee match enum'
  );

  assert.end();
});
