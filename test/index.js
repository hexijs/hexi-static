'use strict'
const hexi = require('hexi')
const hexiStatic = require('..')
const request = require('supertest')

describe('auth', function() {
  let server

  beforeEach(function() {
    server = hexi()
    return server.register(hexiStatic)
  })

  it('should return static file', function(done) {
    server.route({
      path: '/',
      method: 'USE',
      handler: {
        static: {
          root: __dirname + '/static',
        },
      },
    })

    request(server.express)
      .get('/foo.txt')
      .expect(200, 'bar\n', done)
  })

  it('should behave normally when function handler passed', function(done) {
    server.route({
      path: '/',
      method: 'GET',
      handler(req, res) {
        res.send('qar')
      },
    })

    request(server.express)
      .get('/')
      .expect(200, 'qar', done)
  })
})
