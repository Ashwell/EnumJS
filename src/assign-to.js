
import argParse from './arg-parse';
import $enum from './enum';

var assignTo;

assignTo = function assignTo( assignee, ...args ) {
  assign( $enum( ...argParse( ...args )), assignee );
};

export default assignTo;
