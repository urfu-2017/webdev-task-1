'use strict';

class PieceOfNews {
    constructor({ title, publishedAt, urlToImage, description, source, url }) {
        this.title = title;
        this.urlToImage = urlToImage;
        this.publishedAt = publishedAt;
        this.description = description;
        this.source = source;
        this.url = url;
    }
}

exports.PieceOfNews = PieceOfNews;
