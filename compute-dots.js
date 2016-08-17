'use strict';

let fs = require('fs');
let csv = require('csv');
let gju = require('geojson-utils');

console.log('Loading data ...');

let geography = require('./filtered/iris-geography.json');

let parser = csv.parse({ delimiter: ',' }, (err, data) => {
    console.log('Computing grid ...');

    let features = [];

    for (let lat = 49.3882; lat < 49.4369; lat += 0.002) {
        for (let lon = 2.7785; lon < 2.8664; lon += 0.002) {
            let point = {
                "type": "Point",
                "coordinates": [lon, lat]
            };

            let pointIsInZone = false;

            for (let i in geography.features) {
                if (gju.pointInPolygon(point, geography.features[i].geometry) !== false) {
                    pointIsInZone = true;
                    break;
                }
            }

            if (pointIsInZone) {
                features.push({
                    "type": "Feature",
                    "properties": {},
                    "geometry": point
                });
            }
        }
    }

    console.log('Computing stations ...');

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
            features.push({
                "type": "Feature",
                "properties": {
                    "marker-color": "#ff0000"
                },
                "geometry": point
            });
        }
    }

    console.log('Saving ...');

    fs.writeFileSync('./computed/iris-dots.json', JSON.stringify({
        "type": "FeatureCollection",
        "features": features
    }));
});

fs.createReadStream('./raw/stations.csv').pipe(parser);
