'use strict';

class Article {
    constructor({ title, description, source, publishDatetime, image }) {
        this.title = title;
        this.description = description;
        this.source = source;
        this.publishingTime = publishDatetime;
        this.image = image;
    }
}

module.exports = Article;
