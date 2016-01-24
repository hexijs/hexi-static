'use strict'
const express = require('express')

module.exports = function(server) {
  server.pre('route', (next, opts) => {
    if (typeof opts.handler !== 'object' || !opts.handler.static) {
      return next(opts)
    }

    let staticOpts = opts.handler.static
    opts.handler = express.static(staticOpts.root, staticOpts)
    next(opts)
  })
}

module.exports.attributes = {
  pkg: require('./package.json'),
}
