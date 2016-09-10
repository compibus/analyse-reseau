'use strict';

let fs = require('fs');
let gju = require('geojson-utils');

console.log('Loading data ...');

let grid = require('./built/5-grid-population.json');
let stations = require('./built/6-stations.json');

console.log('Computing ...');

let dot, nearestStation, distance;
let sum = 0, count = 0;

// For each dot, find the nearest station
for (let i in grid.features) {
    dot = grid.features[i];

    nearestStation = null;

    for (let j in stations) {
        distance = gju.pointDistance(
            dot.geometry,
            { type: 'Point', coordinates:[ stations[j].lon, stations[j].lat ] }
        );

        if (!nearestStation || distance < nearestStation.distance) {
            nearestStation = {
                distance: distance,
                station: stations[j]
            };
        }
    }

    // Associate the population to this station with its distance
    sum += nearestStation.distance * dot.properties['POPULATION'];
    count += dot.properties['POPULATION'];
}

fs.writeFileSync('./result/7-average-distance.json', JSON.stringify({
    name: 'Average distance between each inhabitant of Compiègne and the nearest bus station (in meters)',
    value:  sum / count
}));
