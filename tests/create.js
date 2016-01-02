'use strict';

import test from 'tape';
import Enum from '../src/api';

test( 'enums can be created from a list of strings', function( assert ) {
  var
    args = [ 'one', 'two', 'three', 'four', 'five' ],
    myEnum = new Enum( args );

  args.forEach( propName => {
    assert.true( propName in myEnum, propName + ' is in enum' );
  });

  assert.end();
});

test( 'enums can be created from an object of name:value pairs', function( assert ) {
  var
    args = {
      1: 'a',
      2: 'b',
      3: 'c',
      4: 'd',
      5: 'e'
    },
    myEnum = new Enum( args );

  Object.keys( args ).forEach( propName => {
    var value = args[ propName ];

    assert.true( propName in myEnum, propName + ' is in enum' );
    assert.true( value === myEnum[ propName ], propName + ' maps to ' + value + ' in enum' );
  });

  assert.end();
});
