'use strict';

// transform shallow statistics object in a better formatted one.
function enhanceStatistics(stats) {
  var lst = [];

  stats.forEach(function(statItem) {
    var stat = { consumerPrice: {}, distributionPrice: {} };

    stat.type = statItem.type;

    stat.consumerPrice.averagePrice = statItem.consumerAveragePrice;
    stat.consumerPrice.standardDeviation = statItem.consumerStandardDeviation;
    stat.consumerPrice.minPrice = statItem.consumerMinPrice;
    stat.consumerPrice.maxPrice = statItem.consumerMaxPrice;
    stat.consumerPrice.averageMargin = statItem.consumerAverageMargin;

    stat.distributionPrice.averagePrice = statItem.distributionAveragePrice;
    stat.distributionPrice.standardDeviation = statItem.distributionStandardDeviation;
    stat.distributionPrice.minPrice = statItem.distributionMinPrice;
    stat.distributionPrice.maxPrice = statItem.distributionMaxPrice;

    lst.push(stat);
  });

  return lst;
};


module.exports = { enhanceStatistics: enhanceStatistics };
