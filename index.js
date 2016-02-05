'use strict'
const serveStatic = require('serve-static')

module.exports = function(server) {
  server.route.pre((next, opts) => {
    next(Object.assign(opts, {
      handler: !opts.handler || !opts.handler.static ? opts.handler :
        serveStatic(opts.handler.static.root, opts.handler.static),
    }))
  })
}

module.exports.attributes = {
  pkg: require('./package.json'),
}
