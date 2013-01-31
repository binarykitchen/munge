var testCase = require('nodeunit').testCase,
    munge;

// boo, type checks are not enabled in nodeunit
function isFunction(anything)
{
    return typeof(anything) == 'function';
};

// boo, type checks are not enabled in nodeunit
function isString(anything)
{
    return typeof(anything) == 'string';
};

module.exports = testCase({
    'Loading munge (require)': function(t) {
        munge = require('../munge.js');

        t.ok(munge, 'Munge module is loaded.');
        t.done()
    },

    'Checking type munge.email': function(t) {
        t.ok(isFunction(munge), 'Type of munge.email is a function.');
        t.done();
    },

    'Munge with weird parameters': function(t) {
        var nothingMunged = munge();
        t.strictEqual(nothingMunged, '', 'Empty parameter returns an empty string');

        t.throws(function() {
            munge(new Object());
        }, 'TypeError', 'Object parameter causes TypeError');

        t.done();
    },

    'Munging my own email address': function(t) {
        var EMAIL_ADDRESS        = 'spacemonkey@moon.com',
            MUNGED_EMAIL_ADDRESS = '&#115;&#112;&#97;&#99;&#101;&#109;&#111;&#110;&#107;&#101;&#121;&#64;&#109;&#111;&#111;&#110;&#46;&#99;&#111;&#109;';

        var mungedEmailAddress = munge(EMAIL_ADDRESS);

        t.ok(mungedEmailAddress, 'Munged email address is not empty.');
        t.ok(isString(mungedEmailAddress), 'Munged email address is a string.');
        t.strictEqual(mungedEmailAddress, MUNGED_EMAIL_ADDRESS, 'Munged email address is correct.');

        t.done();
    }
});