'use strict';

const categories = require('../mocks/categories');

const storage = [];

for (const category of categories) {
    storage.push({
        title: category.title,
        name: category.name
    });
}

class Category {
    static getAll() {
        return storage;
    }
}

module.exports = Category;
