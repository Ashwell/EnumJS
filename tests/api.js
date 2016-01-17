
import test from 'tape';
import $enum, { assign, assignTo } from '../src/api';

test( 'proper default and named exports', function( assert ) {
  assert.equal( typeof $enum, 'function', '$enum is a function' );
  assert.equal( typeof assign, 'function', 'assign is a function and named export' );
  assert.equal( typeof assignTo, 'function', 'assignTo is a function and named export' );
  assert.end();
});

