
var
  define,
  defaults = {
    configurable: false,
    enumerable: true,
    writable: false
  };

define = function( instance, name, value, traits = {}) {
  traits = Object.assign({}, defaults, traits, { value });
  return Object.defineProperty( instance, name, traits );
};

export default define;
