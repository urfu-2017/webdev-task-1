'use strict';

const storage = [];

class News {
    constructor({ title, category }) {
        this.name = title;
        this.category = category;
    }

    save() {
        storage.push(this);
    }

    static all() {
        return storage;
    }

    static filter(category) {
        return storage.find(news => news.category === category);
    }
}

module.exports = News;
