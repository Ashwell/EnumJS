
import define from './define';

export default function createProto( keys, values, constructor ) {
  var proto = {};

  define( proto, 'length', keys.length );
  define( proto, 'keys', keys, { enumerable: false });
  define( proto, 'values', values, { enumerable: false });
  proto.constructor = constructor;

  return Object.freeze( proto );
}
