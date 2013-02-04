# munge

ummm, just a tiny node module to munge any strings. useful if wou want to obfuscate email addresses to valid, numeric html entities.

as long as spam robots are still dumb, this should significantly reduce the risk of the email address being harvested.

## simple example

by default, munge() encodes each char with a random encoding, either ascii or unicode, to make it more difficult for spammers.

because of the random generator the example below does not always produce the same output:


``` js
var munge = require('munge');

console.log(munge('spacemonkey@moon.com'));
```

might output something like:
```
&#x0073;&#x0070;&#x0061;&#99;&#x0065;&#x006D;&#x006F;&#x006E;&#107;&#x0065;&#x0079;&#x0040;&#x006D;&#111;&#x006F;&#110;&#46;&#99;&#x006F;&#x006D;
```

this is valid html code!

based on rfc1866, ftp://ftp.rfc-editor.org/in-notes/rfc1866.txt

## more examples

### ascii encoding only

``` js
var munge = require('munge');

console.log(munge('spacemonkey@moon.com', {encoding: 'ascii'}));
```

should output the string with ascii encodings like that:
```
&#115;&#112;&#97;&#99;&#101;&#109;&#111;&#110;&#107;&#101;&#121;&#64;&#109;&#111;&#111;&#110;&#46;&#99;&#111;&#109;
```

### utf8 encoding only

``` js
var munge = require('munge');

console.log(munge('spacemonkey@moon.com', {encoding: 'utf8'}));
```

outputs the same blurb but in unicode:
```
&#x0073;&#x0070;&#x0061;&#x0063;&#x0065;&#x006D;&#x006F;&#x006E;&#x006B;&#x0065;&#x0079;&#x0040;&#x006D;&#x006F;&#x006F;&#x006E;&#x002E;&#x0063;&#x006F;&#x006D;
```

## todo

* express/jade integration
* have it a piped stream instead (for larger strings; not sure if it makes sense here)

## license

MIT