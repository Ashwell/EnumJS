
import define from './define';
import $enum from './enum';

var assign;

assign = function ( enumInstance, assignTo ) {
  for ( let { key, value } of enumInstance ) {
    define( assignTo, key, value );
  }
};

export default assign;
