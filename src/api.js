
import enumFactory from './enum';
import assign from './assign';

var assignTo;

assignTo = function ( assignee, ...args ) {
  assign( enumFactory( ...args ), assignee );
};

enumFactory.assignTo = assignTo;
enumFactory.assign = assign;

export default enumFactory;
export { assignTo as assignTo };
export { default as assign } from './assign';
