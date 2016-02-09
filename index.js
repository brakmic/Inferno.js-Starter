'use strict';
var Hapi                 = require('hapi');
var path                 = require('path');
var server               = new Hapi.Server();
var Inert                = require('inert');

server.connection({ port: 8080 });

server.register(Inert, function () {});

server.route({
      path: '/app.min.js',
      method: 'GET',
      handler: function(request, reply) {
          reply.file('build/release/app.min.js');
      }
});

server.route({
      path: '/app.min.js.map',
      method: 'GET',
      handler: function(request, reply) {
          reply.file('build/release/app.min.js.map');
      }
});

server.route({
      path: '/styles/{filename*}',
      method: 'GET',
      handler: {
        directory: {
            path: 'build/release/styles',
            listing: false
        }
      }
});

server.route({
      path: '/content/{filename*}',
      method: 'GET',
      handler: {
        directory: {
            path: 'build/release/content',
            listing: false
        }
      }
});


server.route({
      path: '/{p*}',
      method: 'GET',
      handler: function(request, reply) {
          reply.file('build/release/index.html');
      }
});

/* start server */
server.start(function() {
    console.log('Server running at:', server.info.uri);
});
