
import test from 'tape';

import enumFactory, { assign, assignTo } from '../src/api';

test( 'proper default and named exports', function( assert ) {

  assert.equal( typeof enumFactory, 'function', 'enumFactory is a function' );
  assert.equal( typeof assign, 'function', 'assign is a function and named export' );
  assert.equal( typeof assignTo, 'function', 'assignTo is a function and a named export' );

  assert.equal( enumFactory.assign, assign, 'assign exists on enumFactory' );
  assert.equal( enumFactory.assignTo, assignTo, 'assignTo exists on enumFactory' );

  assert.end();
});
