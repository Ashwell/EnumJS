
import test from 'tape';
import { assignTo } from '../src/api';

var args = [ 'one', 'two', 'three' ];

test.skip( 'assignTo takes enum arguments', function( assert ) {
  var assignee = {};

  assignTo( assignee, args );

  assert.deepEqual(
    Object.keys( assignee ),
    args,
    'own keys match arguments array'
  );


  assert.end();
});

