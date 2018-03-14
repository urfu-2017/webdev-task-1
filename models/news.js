'use strict';
const NewsAPI = require('newsapi');
const config = require('../config');
const newsapi = new NewsAPI(config.newsApiKey);

module.exports = class News {
    static getNews(req) {
        const country = req.query.country || 'us';
        const options = {
            category: req.params.name,
            language: 'en',
            country: country,
            pageSize: 5
        };

        return newsapi.v2.topHeadlines(options);
    }
};
