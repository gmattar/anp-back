var Hapi = require('hapi');

var db = require('./models');
var routes = require('./routes');

// create the server
var server = new Hapi.Server();

server.connection({
  port: 3000,
  routes: {
    cors: {
      origin: ['*']
    }
  }
});

server.route(routes);

db.sequelize.sync().then(function () {
  server.start(function () { console.log('Running on 3000'); });
})
.catch(function (err) { console.log(err); });
