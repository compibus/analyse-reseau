'use strict';

let fs = require('fs');

console.log('Loading raw data ...');

let raw = require('./raw/iris-geography.json');

console.log('Filtering ...');

let filterdFeatures = raw.features.filter((item) => {
    return item.properties['TYP_IRIS'] === 'H' &&
        (item.properties['NOM_COM'] === 'COMPIEGNE'
        || item.properties['NOM_COM'] === 'MARGNY-LES-COMPIEGNE');
});

console.log('Saving ...');

fs.writeFileSync('./filtered/iris-geography.json', JSON.stringify({
    type: 'FeatureCollection',
    features: filterdFeatures
}));
