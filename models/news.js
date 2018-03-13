'use strict';

const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('3a4134a13319447b8a05a39f138f568a');

class News {
    constructor({ title, description, publishedAt, source, urlToImage }) {
        this.title = title;
        this.description = description;
        this.publishedAt = publishedAt;
        this.source = source.name;
        this.urlToImage = urlToImage;
    }

    static async loadAll(country, category) {
        const topHeadlines = await newsapi.v2.topHeadlines({
            country: country || 'ru',
            category: category
        });

        return topHeadlines.articles.map(a => new News(a));
    }
}

module.exports = News;
