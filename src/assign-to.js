/*eslint-disable no-unused-vars*/
import $enum from './enum';
import assign from './assign';

var assignTo;

assignTo = function( assignee, ...args ) {
  assign( $enum( ...args ), assignee );
};

export default assignTo;
