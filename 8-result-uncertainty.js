'use strict';

let fs = require('fs');
let gju = require('geojson-utils');

console.log('Computing ...');

let precision = require('./precision.json');

let populationUncertainty = 0.025980762;

// Distance between two dots of the grid divded by two
let lattitude = 49.3882, longitude = 2.7785;

let directAbsoluteDistanceUncertainty = gju.pointDistance(
    { type: 'Point', coordinates:[ longitude, lattitude ] },
    { type: 'Point', coordinates:[ longitude + (precision.lon / 2), lattitude + (precision.lat / 2) ] }
);

let result = require('./result/7-average-distance.json');
let distanceUncertainty = directAbsoluteDistanceUncertainty / result.value;

let globalUncertainty = (Math.sqrt(Math.pow(populationUncertainty, 2) + Math.pow(distanceUncertainty, 2))) * 2;

console.log('Saving ...');

fs.writeFileSync('./result/8-average-distance-with-uncertainty.json', JSON.stringify({
    value:  result.value,
    uncertainty: '+/- '+ result.value * globalUncertainty
}));

