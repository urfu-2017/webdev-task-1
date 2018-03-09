'use strict';

const fs = require('fs');

function loadInitialData() {
    const Category = require('../models/category');
    const categories = require('../data/categories');

    for (const category of categories) {
        new Category(category.name, category.title, category.icon).save();
    }
}

function registerPartialsSync(partialsDir, hbsInstance) {
    const filenames = fs.readdirSync(partialsDir);

    filenames.forEach(filename => {
        let matches = /^([^.]+).hbs$/.exec(filename);
        if (!matches) {
            return;
        }
        const name = matches[1];
        const template = fs.readFileSync(partialsDir + '/' + filename, 'utf8');
        hbsInstance.registerPartial(name, template);
    });
}

module.exports = { loadInitialData, registerPartialsSync };
