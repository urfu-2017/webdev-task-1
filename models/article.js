'use strict';

class Article {
    constructor({ title, description, source, publishDatetime, image, url }) {
        this.title = title;
        this.description = description;
        this.source = source;
        this.publishDatetime = publishDatetime;
        this.image = image;
        this.url = url;
    }
}

module.exports = Article;
