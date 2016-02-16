'use strict';
var Hapi                 = require('hapi');
var path                 = require('path');
var server               = new Hapi.Server();
var Inert                = require('inert');

server.connection({ port: 8080 });

server.register(Inert, function () {});

server.route({
      path: '/static/{filename*}',
      method: 'GET',
      handler: {
        directory: {
            path: 'static',
            listing: false
        }
      }
});

server.route({
      path: '/dist/{filename*}',
      method: 'GET',
      handler: {
        directory: {
            path: 'dist',
            listing: false
        }
      }
});


server.route({
      path: '/{p*}',
      method: 'GET',
      handler: function(request, reply) {
          reply.file('index.html');
      }
});

/* start server */
server.start(function() {
    console.log('Server running at:', server.info.uri);
});
