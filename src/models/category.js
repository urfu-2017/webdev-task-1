'use strict';

const storage = {};

class Category {
    constructor(name, title, icon) {
        this.name = name;
        this.title = title;
        this.icon = icon;
    }

    save() {
        storage[this.name] = {
            title: this.title,
            icon: this.icon
        };
    }

    static all() {
        return storage;
    }

    static exists(name) {
        return name in storage;
    }
}

module.exports = Category;
