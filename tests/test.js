

var Enum = require('../enum').Enum;

console.log(Enum);

var e1 = new Enum(['one', 'two', 'three', 'four', 'five']),
    e2 = new Enum({1:'one', 2:'two', 3:'three', 4:'four', 5:'five'});

console.log(e1.toString(), e1);
console.log(e2.toString(), e2);

console.log( 'e1.one: ' + e1.one  );
console.log( 'e2[1]: ' + e2[1]  );

