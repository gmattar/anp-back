'use strict';

var controllers = require('./controllers');

module.exports = [
  // Respond a JSON object with the format specified in:
  // bitbucket.org/softruck/node-test/src/91c2d054c5682887cd1c446ebad9fbc89468fe5a/output.json
  //
  {
    method: 'GET',
    path: '/states',
    handler: controllers.states.getAll
  },
  {
    method: 'GET',
    path: '/states/{state}',
    handler: controllers.states.getByName
  },
  {
    method: 'GET',
    path: '/cities',
    handler: controllers.cities.getAll
  },
  {
    method: 'GET',
    path: '/cities/{id}',
    handler: controllers.cities.getById
  }
];
