'use strict';

import test from 'tape';
import Enum from '../src/enum';

test( 'enums can be created from a list of strings', function( assert ) {
  var
    args = [ 'one', 'two', 'three', 'four', 'five' ],
    myEnum = new Enum( args );

  args.forEach(function( propName ) {
    assert.true( propName in myEnum, propName + ' is in enum' );
  });

  assert.end();
});

test( 'enums can be created from an object of name:value pairs', function( assert ) {
  var
    args = {
      1: 'one',
      2: 'two',
      3: 'three',
      4: 'four',
      5: 'five'
    },
    myEnum = new Enum( args );

  Object.keys( args ).forEach(function( propName ) {
    var value = args[ propName ];

    assert.true( propName in myEnum, propName + ' is in enum' );
    assert.true( value === myEnum[ propName ], propName + ' maps to ' + value + ' in enum' );
  });

  assert.end();
});

