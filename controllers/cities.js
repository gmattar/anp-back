'use strict';

var db = require('../models');
var helpers = require('./helpers');

function getAll(request, reply) {
  db.models.Cities
  .findAll(
    {
      order: [[ 'name', 'ASC' ]]
    }
  )
  .then(function (cities) {
    reply(cities);
  });
}

function getById(request, reply) {
  db.models.Cities
  .findById(
    decodeURIComponent(request.params.id),
    {
      include: [
        {
          model: db.models.Stations,
          include: [{ model: db.models.Prices }]
        },
        { model: db.models.Statistics }
      ],
      order: [
        [ db.models.Stations, 'name', 'DESC' ],
        [ db.models.Statistics, 'WeekId', 'DESC' ]
      ]
    }
  )
  .then(function (cityItem) {
    var city = {};

    city.name = cityItem.name;
    city.state = cityItem.state;
    city.stations = cityItem.Stations;
    city.statistics = helpers.enhanceStatistics(cityItem.Statistics);

    reply(city);
  });
}

module.exports = {
  getAll: getAll,
  getById: getById,
};
