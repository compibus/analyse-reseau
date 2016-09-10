'use strict';

let fs = require('fs');
let csv = require('csv');
let gju = require('geojson-utils');

console.log('Loading data ...');

let parser = csv.parse({ delimiter: ',' }, (err, data) => {
    let stations = [];

    for (let i in data) {
        stations.push({
            name: data[i][0],
            lat: parseFloat(data[i][1]),
            lon: parseFloat(data[i][2]),
        });
    }

    console.log('Saving ...');

    fs.writeFileSync('./built/6-stations.json', JSON.stringify(stations));
});

fs.createReadStream('./data/stations.csv').pipe(parser);
