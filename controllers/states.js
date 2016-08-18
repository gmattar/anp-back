'use strict';

var db = require('../models');
var helpers = require('./helpers');

function getAll(request, reply) {
  db.models.Cities
    .findAll({
      include: [
        { model: db.models.Stations },
        { model: db.models.Statistics }
      ],
      order: [
        [ 'state', 'ASC' ],
        [ 'name', 'ASC' ],
        [ db.models.Stations, 'name', 'DESC' ],
        [ db.models.Statistics, 'WeekId', 'DESC' ]
      ]
    })
    .then(function (cities) {
      var res = [];
      var lst = [];
      var prev = '';

      // loop through cities and build the json response with the desired format.
      cities.forEach(function(cityItem) {
        var state = cityItem['state'];
        var city = {};

        if (prev && prev != state) {
            if (lst.length) {
              res.push({ name: prev, cities: lst });
              lst = [];
            }
        }

        city.name = cityItem.name;
        city.stations = cityItem.Stations;
        city.statistics = helpers.enhanceStatistics(cityItem.Statistics);

        lst.push(city);

        prev = state;
      });

      if (lst.length) {
        res.push({ name: prev, cities: lst });
      }

      reply(res);
    });
}

function getByName(request, reply) {
  db.models.Cities
    .findAll({
      where: { state: encodeURIComponent(request.params.state) },
      include: [
        { model: db.models.Stations },
        { model: db.models.Statistics, separate: true, limit: 1 }
      ],
      order: [
        [ db.models.Stations, 'name', 'DESC' ],
        [ db.models.Statistics, 'WeekId', 'DESC' ]
      ]
    })
    .then(function (cities) {
      var res = [];
      var lst = [];

      // loop through cities and build the json response with the desired format.
      cities.forEach(function(cityItem) {
        var state = cityItem['state'];
        var city = {};

        city.name = cityItem.name;
        city.stations = cityItem.Stations;
        city.statistics = helpers.enhanceStatistics(cityItem.Statistics);

        lst.push(city);
      });

      if (lst.length) {
        res.push({ name: encodeURIComponent(request.params.state), cities: lst });
      }

      reply(res);
    });
}

module.exports = {
  getAll: getAll,
  getByName: getByName
};
