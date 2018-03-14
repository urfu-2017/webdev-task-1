'use strict';

const { categories } = require('../config.json');


class Category {
    static findByName(name) {
        return categories[name];
    }

    static findAll() {
        return categories;
    }
}

module.exports = Category;
