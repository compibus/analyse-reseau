'use strict';

let fs = require('fs');
let csv = require('csv');
let gju = require('geojson-utils');

console.log('Loading data ...');

let geography = require('./built/1-filtered-geography.json');
let precision = require('./precision.json');

console.log('Creating grid (lat: 49.3882 to 49.4369 step '+precision.lat+', lon: 2.7785 to 2.8664 step '+precision.lon+') ...');

let features = [];

for (let lat = 49.3882; lat < 49.4369; lat += precision.lat) {
  for (let lon = 2.7785; lon < 2.8664; lon += precision.lon) {
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
        "properties": {
          "marker-color": "#7dbfff",
          "marker-size": "small"
        },
        "geometry": point
      });
    }
  }
}

console.log('Saving ...');

fs.writeFileSync('./built/4-grid-raw.json', JSON.stringify({
  "type": "FeatureCollection",
  "features": features
}));
