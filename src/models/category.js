'use strict';

const storage = [];

class Category {
    constructor(name, title, icon) {
        this.name = name;
        this.title = title;
        this.icon = icon;
    }

    save() {
        storage.push(this);
    }

    static all() {
        return storage;
    }

    static get(name) {
        return storage.find(category => category.name === name);
    }
}

module.exports = Category;
