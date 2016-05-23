'use strict';

let fs = require('fs');

console.log('Loading raw data ...');

let raw = require('./raw/insee-iris/data/iris.json');

console.log('Filtering ...');

let filterdFeatures = raw.features.filter((item) => {
    return item.properties['TYP_IRIS'] === 'H' && item.properties['NOM_COM'] === 'COMPIEGNE';
});

console.log('Saving ...');

fs.writeFileSync('./built/iris.json', JSON.stringify({
    type: 'FeatureCollection',
    features: filterdFeatures
}));
