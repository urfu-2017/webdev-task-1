'use strict';
const fs = require('fs');

module.exports = class Categories {
    static getCategories() {
        const data = fs.readFileSync('./mocks/categories.json');

        return JSON.parse(data);
    }
};
