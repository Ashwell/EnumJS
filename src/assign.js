/*eslint-disable no-unused-vars*/
import define from './define';

var assign = function( enumInstance, assignTo ) {
  for ( let { key, value } of enumInstance ) {
    define( assignTo, key, value );
  }
};

export default assign;
