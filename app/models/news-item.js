'use strict';

module.exports = class NewsItem {
    constructor({ title, description, publishedAt, url }) {
        this.title = title;
        this.description = description;
        this.pulicationTime = publishedAt;
        this.sourceUrl = url;
    }
};
