'use strict';

const storage = [];

class NewsCategory {
    constructor({ name }) {
        this.name = name;
    }

    save() {
        storage.push(this);
    }

    static all() {
        return storage;
    }
}

module.exports = NewsCategory;
