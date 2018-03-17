'use strict';

const storage = [];

class CategoriesRepository {
    getAll() {
        return storage;
    }
    get(name) {
        return storage.find(c => c.name === name);
    }
    save(category) {
        storage.push(category);
    }
}

module.exports = CategoriesRepository;
