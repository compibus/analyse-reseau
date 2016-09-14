'use strict';

let fs = require('fs');
let geojsonArea = require('geojson-area');

console.log('Loading data ...');

let geography = require('./built/1-filtered-geography.json');
let populations = require('./built/2-filtered-population.json');

console.log('Associating ...');

let computed = [];
let maxDensity = 0;
let totalPopulation = 0;

for (let i in geography.features) {
    let feature = geography.features[i];
    let featurePopulation = null;

    for (let j in populations) {
        if (populations[j].iris === feature.properties['DCOMIRIS']) {
            featurePopulation = populations[j]['population-en-2012-princ'];
            break;
        }
    }

    if (! featurePopulation) {
        console.warn('Population not found for IRIS ' + feature.properties['NOM_IRIS']);
        continue;
    }

    totalPopulation += parseInt(featurePopulation);

    feature.properties['SURFACE_M2'] = geojsonArea.geometry(feature.geometry);
    feature.properties['SURFACE_KM2'] = feature.properties['SURFACE_M2'] / 1000000;
    feature.properties['POPULATION'] = parseInt(featurePopulation);
    feature.properties['DENSITY'] = parseInt(featurePopulation) / feature.properties['SURFACE_KM2'];

    if (maxDensity < feature.properties['DENSITY']) {
        maxDensity = feature.properties['DENSITY'];
    }

    computed.push(feature);
}

// Adapt opacity according to densities
let styled = [];

for (let i in computed) {
    let feature = computed[i];
    let opacity = feature.properties['DENSITY'] / maxDensity;

    feature.properties['fill'] = '#ff0000';
    feature.properties['fill-opacity'] = opacity * 0.9; // always a bit transparent
    feature.properties['stroke-opacity'] = 0.8;
    feature.properties['stroke-width'] = 1;

    styled.push(feature);
}

console.log('Total population: '+totalPopulation);
console.log('Saving ...');

fs.writeFileSync('./built/3-areas-populations.json', JSON.stringify({
    type: 'FeatureCollection',
    features: styled
}));
