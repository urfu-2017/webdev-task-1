'use strict'

const storage = [];

class Category {
    constructor({ title, name }) {
        this.title = title;
        this.name = name;
    }

    save() {
        storage.push(this);
    }

    static findAll() {
        return storage;
    }
}

module.exports = Category;