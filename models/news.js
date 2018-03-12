'use strict';
const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('f8c7968376984c3db60b4759fa20cfe4');

function getNews(req) {
    const country = req.query.country || 'us';
    const options = {
        category: req.params.name,
        language: 'en',
        country: country,
        pageSize: 5
    };

    return newsapi.v2.topHeadlines(options);
}

module.exports = { getNews };
