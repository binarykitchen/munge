'use strict';

var munge = function (anyString) {
    var aMunged = new Array();
    var aChars, i;

    if (anyString) {

        aChars = anyString.split('');

        for (i in aChars)
            aMunged[i] = '&#' + aChars[i].charCodeAt() + ';';
    }

    return aMunged.join('');
};

module.exports = munge;