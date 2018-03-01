'use strict';

class Article {
    constructor({ source, title, description, urlToImage, publishedAt }) {
        this.source = source;
        this.title = title;
        this.description = description;
        this.urlToImage = urlToImage;
        this.publishedAt = publishedAt;
    }
}

module.exports = Article;
