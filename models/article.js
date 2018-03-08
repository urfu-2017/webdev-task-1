'use strict';

class Article {
    constructor({ title, description, source, publishedAt, urlToImage, url }) {
        this.sourceName = source.name;
        this.publicationDate = publishedAt;
        this.url = url;
        this.title = title;
        this.description = description;
        this.urlToImage = urlToImage;
    }
}

module.exports = Article;
