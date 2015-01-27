EnumJS
======
A simple way to create an immutable list of enums in ES5.
Still a WIP use at your own risk

[![Codacy Badge](https://www.codacy.com/project/badge/392d48a4b14f43f3853d534e34bbdd87)](https://www.codacy.com/public/RyanBogle/EnumJS)
[![Code Climate](https://codeclimate.com/github/Ashwell/EnumJS.png)](https://codeclimate.com/github/Ashwell/EnumJS)


Usage
======
NodeJS
```javascript
var Enum = require('Enum').Enum;

var myEnumFromAry = new Enum(['one', 'two', 'three']);
OR
var myEnumFromObj = new Enum({one:1, two:2, three:3});
```

ES5 Compatible Browsers
```javascript
// Enum will exist on the window object after the script is loaded
var myEnumFromAry = new Enum(['one', 'two', 'three']);
OR
var myEnumFromObj = new Enum({one:1, two:2, three:3});
```

Come back for more updates!

