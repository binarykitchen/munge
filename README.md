# munge

ummm, just a tiny node module to munge any strings. useful if wou want to obfuscate email addresses to valid, numeric html entities.

as long as spam robots are still dumb, this should significantly reduce the risk of the email address being harvested.

## example

``` js
var munge     = require('munge');
var ANY_EMAIL = 'spacemonkey@moon.com';

console.log(munge(ANY_EMAIL));
```

should output
```
&#115;&#112;&#97;&#99;&#101;&#109;&#111;&#110;&#107;&#101;&#121;&#64;&#109;&#111;&#111;&#110;&#46;&#99;&#111;&#109;
```

this is valid html code!

based on rfc1866, ftp://ftp.rfc-editor.org/in-notes/rfc1866.txt

## todo

* express/jade integration
* have it a piped stream instead

## license

MIT