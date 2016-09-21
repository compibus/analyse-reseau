'use strict';

let fs = require('fs');

console.log('Loading raw data ...');

let raw = require('./data/iris-geography.json');

console.log('Filtering ...');

let filtered = raw.features.filter((item) => {
    return item.properties['TYP_IRIS'] === 'H' && item.properties['NOM_COM'] === 'COMPIEGNE';
});

console.log('Saving ...');

fs.writeFileSync('./built/1-filtered-geography.json', JSON.stringify({
    type: 'FeatureCollection',
    features: filtered
}));
