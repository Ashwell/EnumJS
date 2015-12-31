
var
  define,
  defaults = {
    configurable: false,
    enumerable: true,
    writeable: false
  };

define = function( instance, name, value, traits={}) {
  traits = Object.assign({}, defaults, traits, { value });
  console.log( traits );
  return Object.defineProperty( instance, name, traits );
};

export default define;
