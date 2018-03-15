'use strict';
const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('7003d399f6ae49cbbd75437b2fb4d33a');

module.exports = class News {
    static getNews(req) {
        const country = req.query.country || 'ru';
        const category = req.params.category;
        const options = {
            category: category.toString(),
            language: req.headers['accept-language'],
            country: country.toString()
        };

        return newsapi.v2.topHeadlines(options);
    }
};
