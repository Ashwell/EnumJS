
import test from 'tape';
import $enum from '../src/api';

var
  descriptor,
  addValue;

descriptor = {
  configurable: false,
  enumerable: true,
  writable: false
};

addValue = function( value ) {
  return Object.assign( descriptor, { value });
};

/* constructor tests */
test( '$enum( ...names )', function( assert ) {
  var
    i = 0,
    args = [ 'zero', 'one', 'two', 'three' ],
    myEnum = $enum( ...args );

  for ( let prop in myEnum ) {
    if ( myEnum.hasOwnProperty( prop )) {
      assert.deepEqual(
        Object.getOwnPropertyDescriptor( myEnum, prop ),
        addValue( i ),
        `property ${ prop } has enum descriptor with value ${ i }`
      );
      i++;
    }
  }

  assert.equal( i, args.length, 'iterated properties count matches argument list length' );
  assert.end();
});

test( '$enum( { name: value })', function( assert ) {
  var
    length = 0,
    argument = {
      1: 'a',
      2: 'b',
      3: 'c',
      4: 'd',
      5: 'e'
    },
    myEnum = $enum( argument );

  for ( let prop in argument ) {
    if ( argument.hasOwnProperty( prop )) {
      let value = argument[ prop ];
      assert.equals(
        value,
        myEnum[ prop ],
        `enum value mirrors object based argument, ${ prop }:${ value }`
      );
      length++;
    }
  }

  for ( let prop in myEnum ) {
    if ( myEnum.hasOwnProperty( prop )) {
      assert.deepEqual(
        Object.getOwnPropertyDescriptor( myEnum, prop ),
        addValue( argument[ prop ]),
        `property ${ prop } has enum descriptor with value ${ myEnum[ prop ]}`
      );
      length--;
    }
  }

  assert.equal( length, 0, 'iterated properties count matches for both argument and enum' );
  assert.end();
});

test( '$enum([ names ])', function( assert ) {
  var
    i = 0,
    args = [ 'zero', 'one', 'two' ],
    myEnum = $enum( args );

  for ( let prop in myEnum ) {
    if ( myEnum.hasOwnProperty( prop )) {
      assert.deepEqual(
        Object.getOwnPropertyDescriptor( myEnum, prop ),
        addValue( i ),
        `property ${ prop } has enum descriptor with value ${ i }`
      );
      i++;
    }
  }

  assert.equals( i, args.length, 'iterated properties count matches argument length' );
  assert.end();
});

test( '$enum( startIndex, [ names ])', function( assert ) {
  var
    i = 0,
    startIndex = 2,
    enumValues,
    enumList = [ 'two', 'three', 'four', 'five', '6' ],
    myEnum = $enum( startIndex, enumList );

  enumValues = {
    two: 2,
    three: 3,
    four: 4,
    five: 5,
    6: 6
  };

  for ( let prop in myEnum ) {
    if ( myEnum.hasOwnProperty( prop )) {
      let value = enumValues[ prop ];
      assert.deepEqual(
        Object.getOwnPropertyDescriptor( myEnum, prop ),
        addValue( value ),
        `property ${ prop } has enum descriptor with value ${ value }`
      );
      i++;
    }
  }

  assert.equals( i, enumList.length, 'iterated properties count matches enum argument list' );
  assert.end();
});

