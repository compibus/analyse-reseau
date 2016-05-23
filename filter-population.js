'use strict';

let fs = require('fs');
let csv = require('csv');

console.log('Loading and parsing raw data ...');

let parser = csv.parse({ delimiter: ',' }, (err, data) => {
    console.log('Filtering ...');

    let keys = null;
    let filtered = [];

    for (let line in data) {
        if (keys === null) {
            keys = [];

            for (let key in data[line]) {
                keys[key] = data[line][key]
                    .toLowerCase()
                    .replace('é', 'e')
                    .replace('ç', 'c')
                    .replace(new RegExp('[^a-z0-9]+', 'g'), '-')
                    .replace(/-$/, '');
            }
        } else {
            if (
                data[line][5] === '60159' // Compiègne
                || data[line][5] === '60382' // Margny
            ) {
                let filteredLine = {};

                for (let i in data[line]) {
                    filteredLine[keys[i]] = data[line][i];
                }

                filtered.push(filteredLine);
            }
        }
    }

    console.log('Saving ...');

    fs.writeFileSync('./filtered/iris-population.json', JSON.stringify(filtered));
});

fs.createReadStream('./raw/iris-population.csv').pipe(parser);
