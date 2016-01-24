'use strict'
const serveStatic = require('serve-static')

module.exports = function(server) {
  server.pre('route', (next, opts) => {
    if (typeof opts.handler !== 'object' || !opts.handler.static) {
      return next(opts)
    }

    let staticOpts = opts.handler.static
    opts.handler = serveStatic(staticOpts.root, staticOpts)
    next(opts)
  })
}

module.exports.attributes = {
  pkg: require('./package.json'),
}
