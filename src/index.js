const encoders = {
  TYPES: ['ascii', 'utf8', 'random'],
  DEFAULT: 'random',

  ascii: {
    alreadyMunged: function(str) {
      if (str.startsWith('&#')) return str
    },

    munge: function(char) {
      return char && char.charCodeAt()
    }
  },

  utf8: {
    alreadyMunged: function(str) {
      if (str.startsWith('&#x')) return str
    },

    munge: function(char) {
      // toString(16) converts decimal (ascii) to hex
      var unicode = encoders.ascii.munge(char).toString(16).toUpperCase()

      // pad with leading zeros to ensure 4 bytes
      while (unicode.length < 4) {
        unicode = '0' + unicode
      }

      return 'x' + unicode
    }
  },

  random: {
    alreadyMunged: function (str) {
      return encoders.ascii.alreadyMunged(str) || encoders.utf8.alreadyMunged(str)
    },

    munge: function (char) {
      const type = encoders.TYPES[Math.floor(Math.random() * encoders.TYPES.length)]
      return encoders[type].munge(char)
    }
  }
}

/**
 * the one and only public function of this module. It takes any string and munges
 * it according to the options. By default it uses a random encoding.
 *
 *
 * @param {String} str any string to munge, for example 'spacemonkey@moon.com'
 * @param {Object} options for munging
 * @param options.encoding can be 'ascii', 'utf8' or 'random' (default)
 * @return {String} the munged string
 * @api public
 */
module.exports = function (str, options) {
  const aMunged = []
  var aChars, i

  //  initialize default options
  options = options || {}

  if (options.encoding) {
    // validate encoding option
    if (encoders.TYPES.indexOf(options.encoding) < 0) {
      throw Error('Invalid encoding option given: ' + options.encoding)
    }
  } else {
    options.encoding = encoders.DEFAULT
  }

  const encoder = encoders[options.encoding]

  if (str) {
    if (encoder.alreadyMunged(str)) {
      return str
    }

    aChars = str.split('')

    for (i in aChars) {
      aMunged[i] = '&#' + encoder.munge(aChars[i]) + ';'
    }
  }

  return aMunged.join('')
}
