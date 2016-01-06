'use strict';

var
  $enum,
  es6Module = require( './dist/enum.js' );

$enum = es6Module.default;
$enum.assign = es6Module.assign;
$enum.assignTo = es6Module.assignTo;

module.exports = $enum;
