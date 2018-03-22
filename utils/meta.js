'use strict';

const fs = require('fs');

function readMeta() {
    const data = fs.readFileSync('meta.json', 'utf-8');

    return JSON.parse(data);
}

exports.meta = readMeta();
