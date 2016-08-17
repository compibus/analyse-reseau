'use strict';

let fs = require('fs');
let csv = require('csv');
let gju = require('geojson-utils');

console.log('Loading data ...');

let geography = require('./filtered/iris-geography.json');
let densities = require('./computed/iris-densities.json');

let parser = csv.parse({ delimiter: ',' }, (err, data) => {
    console.log('Adding stations ...');

    for (let line in data) {
        let point = {
            "type": "Point",
            "coordinates": [parseFloat(data[line][2]), parseFloat(data[line][1])]
        };

        let pointIsInZone = false;

        for (let i in geography.features) {
            if (gju.pointInPolygon(point, geography.features[i].geometry) !== false) {
                pointIsInZone = true;
                break;
            }
        }

        if (pointIsInZone) {
            densities.features.push({
                "type": "Feature",
                "properties": {
                    "marker-color": "#7fc0ff",
                    "marker-size": "small"
                },
                "geometry": point
            });
        }
    }

    console.log('Saving ...');

    fs.writeFileSync('./computed/iris-dots-densities.json', JSON.stringify(densities));
});

fs.createReadStream('./raw/stations.csv').pipe(parser);
