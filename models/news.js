'use strict';

const storage = [];

class News {
    constructor({ author, title, description, url, urlToImage, publishedAt, source }) {
        this.source = source;
        this.title = title;
        this.description = description;
        this.author = author;
        this.urlToImage = urlToImage;
        this.publishedAt = publishedAt;
        this.url = url;
    }

    save() {
        storage.push(this);
    }

    static findByCategory(category) {
        return storage.filter(news => news.category === category);
    }

    static findAll() {
        return storage;
    }
}

module.exports = News;
