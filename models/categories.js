'use strict';

const categories = require('../content/categories.json');

class Categories {
    static getData() {
        return categories;
    }
}

module.exports = Categories;
