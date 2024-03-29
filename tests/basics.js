const testCase = require('nodeunit').testCase

var munge

function isFunction (anything) {
  return typeof (anything) === 'function'
}

function isString (anything) {
  return typeof (anything) === 'string'
}

module.exports = testCase({
  'loading munge (require)': function (t) {
    munge = require('../src/index.js')

    t.ok(munge, 'munge module is loaded.')
    t.done()
  },

  'checking type munge.email': function (t) {
    t.ok(isFunction(munge), 'type of munge.email is a function.')
    t.done()
  },

  'munge with weird parameters': function (t) {
    const nothingMunged = munge()
    t.strictEqual(nothingMunged, '', 'empty parameter returns an empty string')

    t.throws(function () {
      munge({})
    }, 'TypeError', 'first parameter as an object causes TypeError to be thrown.')

    t.throws(function () {
      munge(null, { encoding: 'hex' })
    }, 'Error', 'unsupported encoding parameter causes an error to be thrown.')

    t.doesNotThrow(function () {
      munge(null, { encoding: 'ascii' })
    }, 'Error', 'encoding option ascii should not throw an error.')

    t.doesNotThrow(function () {
      munge(null, { encoding: 'utf8' })
    }, 'Error', 'encoding option utf8 should not throw an error.')

    t.doesNotThrow(function () {
      munge(null, { encoding: 'random' })
    }, 'Error', 'encoding option random should not throw an error.')

    t.done()
  },

  'munge my own email address by random': function (t) {
    const EMAIL_ADDRESS = 'spacemonkey@moon.com'

    const mungedEmailAddress = munge(EMAIL_ADDRESS)

    t.ok(mungedEmailAddress, 'munged email address is not empty.')
    t.ok(isString(mungedEmailAddress), 'munged email address is a string.')

    t.done()
  },

  'ASCII munge my own email address': function (t) {
    const EMAIL_ADDRESS = 'spacemonkey@moon.com'
    const MUNGED_EMAIL_ADDRESS = '&#115;&#112;&#97;&#99;&#101;&#109;&#111;&#110;&#107;&#101;&#121;&#64;&#109;&#111;&#111;&#110;&#46;&#99;&#111;&#109;'

    const mungedEmailAddress = munge(EMAIL_ADDRESS, { encoding: 'ascii' })

    t.ok(mungedEmailAddress, 'ascii munged email address is not empty.')
    t.ok(isString(mungedEmailAddress), 'ascii munged email address is a string.')
    t.strictEqual(mungedEmailAddress, MUNGED_EMAIL_ADDRESS, 'ascii munged email address is correct.')

    t.done()
  },

  'UTF8 munge my own email address': function (t) {
    const EMAIL_ADDRESS = 'spacemonkey@moon.com'
    const MUNGED_EMAIL_ADDRESS = '&#x0073;&#x0070;&#x0061;&#x0063;&#x0065;&#x006D;&#x006F;&#x006E;&#x006B;&#x0065;&#x0079;&#x0040;&#x006D;&#x006F;&#x006F;&#x006E;&#x002E;&#x0063;&#x006F;&#x006D;'

    const mungedEmailAddress = munge(EMAIL_ADDRESS, { encoding: 'utf8' })

    t.ok(mungedEmailAddress, 'utf8 munged email address is not empty.')
    t.ok(isString(mungedEmailAddress), 'utf8 munged email address is a string.')
    t.strictEqual(mungedEmailAddress, MUNGED_EMAIL_ADDRESS, 'utf8 munged email address is correct.')

    t.done()
  },

  'do not munge already munged ascii address': function (t) {
    const MUNGED_EMAIL_ADDRESS = '&#115;&#112;&#97;&#99;&#101;&#109;&#111;&#110;&#107;&#101;&#121;&#64;&#109;&#111;&#111;&#110;&#46;&#99;&#111;&#109;'
    const EMAIL_ADDRESS = MUNGED_EMAIL_ADDRESS

    const mungedEmailAddress = munge(EMAIL_ADDRESS, { encoding: 'ascii' })

    t.ok(mungedEmailAddress, 'ascii munged email address is not empty.')
    t.ok(isString(mungedEmailAddress), 'ascii munged email address is a string.')
    t.strictEqual(mungedEmailAddress, MUNGED_EMAIL_ADDRESS, 'ascii munged email address is correct.')

    t.done()
  },

  'do not munge already munged UTF8 email address': function (t) {
    const MUNGED_EMAIL_ADDRESS = '&#x0073;&#x0070;&#x0061;&#x0063;&#x0065;&#x006D;&#x006F;&#x006E;&#x006B;&#x0065;&#x0079;&#x0040;&#x006D;&#x006F;&#x006F;&#x006E;&#x002E;&#x0063;&#x006F;&#x006D;'
    const EMAIL_ADDRESS = MUNGED_EMAIL_ADDRESS

    const mungedEmailAddress = munge(EMAIL_ADDRESS, { encoding: 'utf8' })

    t.ok(mungedEmailAddress, 'utf8 munged email address is not empty.')
    t.ok(isString(mungedEmailAddress), 'utf8 munged email address is a string.')
    t.strictEqual(mungedEmailAddress, MUNGED_EMAIL_ADDRESS, 'utf8 munged email address is correct.')

    t.done()
  },
})
