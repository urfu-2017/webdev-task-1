'use strict';

class Article {
    constructor({ source, title, description, urlToImage, publishedAt }) {
        this.source = source;
        this.title = title;
        this.description = description;
        this.urlToImage = urlToImage;
        this.publishedAt = new Date(publishedAt).toDateString();
    }
}

module.exports = Article;
