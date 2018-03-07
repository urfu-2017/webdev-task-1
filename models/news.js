'use strict';

const storage = [];

// Модели замыкают на себя работу с данными
// и обычно представляют собой «класс»

class News {
    constructor({ name, englishName, image }) {
        this.name = name;
        this.englishName = englishName;
        this.image = image;
    }

    save() {
        storage.push(this);
    }

    static find(name) {
        return storage.find(news => news.name === name);
    }

    static findAll() {
        return storage;
    }
}

module.exports = News;
