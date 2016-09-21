'use strict';

let fs = require('fs');
let csv = require('csv');
let gju = require('geojson-utils');

console.log('Loading data ...');

let parser = csv.parse({ delimiter: ',' }, (err, data) => {
    let stations = [], geojson = [];

    for (let i in data) {
        stations.push({
            name: data[i][0],
            lat: parseFloat(data[i][1]),
            lon: parseFloat(data[i][2]),
        });

        geojson.push({
            "type": "Feature",
            "properties": {
                "marker-color": "#62AA60",
                "marker-size": "small"
            },
            "geometry": {
                "type": "Point",
                "coordinates": [parseFloat(data[i][2]), parseFloat(data[i][1])]
            }
        });
    }

    console.log('Saving ...');

    fs.writeFileSync('./built/6-stations.json', JSON.stringify(stations));
    fs.writeFileSync('./built/6-stations-geography.json', JSON.stringify({
        "type": "FeatureCollection",
        "features": geojson
    }));
});

fs.createReadStream('./data/stations.csv').pipe(parser);
