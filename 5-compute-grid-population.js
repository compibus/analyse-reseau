'use strict';

let fs = require('fs');
let gju = require('geojson-utils');

console.log('Loading data ...');

let areasPopulation = require('./built/3-areas-populations.json');
let grid = require('./built/4-grid-raw.json');

console.log('Computing grid population ...');

let areas = [], area;

// For each area
for (let i in areasPopulation.features) {
    area = {
        population: parseInt(areasPopulation.features[i].properties['POPULATION']),
        dots: []
    };

    // For each dot
    for (let j in grid.features) {

        // If this dot is in the zone, add it
        if (gju.pointInPolygon(grid.features[j].geometry, areasPopulation.features[i].geometry) !== false) {
            area.dots.push(grid.features[j]);
        }
    }

    areas.push(area);
}

// Now we split all the population between dots
let result = [], point;

for (let i in areas) {
    area = areas[i];

    let areaPopulationPerDot = Math.ceil(area.population / area.dots.length);

    for (let j in area.dots) {
        point = area.dots[j];
        point.properties['POPULATION'] = areaPopulationPerDot;

        result.push(point);
    }
}

console.log('Saving ...');

fs.writeFileSync('./built/5-grid-population.json', JSON.stringify({
    type: 'FeatureCollection',
    features: result
}));
