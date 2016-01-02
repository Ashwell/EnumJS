
import define from './define';
import enumFactory from './enum';

var assign;

assign = function ( enumInstance, assignTo ) {
  for ( let { key, value } of enumInstance ) {
    define( assignTo, key, value );
  }
};

export default assign;
