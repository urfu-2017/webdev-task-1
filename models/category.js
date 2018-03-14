'use strict';

const { categories } = require('../config.json');


module.exports.Category = class {
    static findByName(name) {
        return categories[name];
    }

    static findAll() {
        return categories;
    }
};
