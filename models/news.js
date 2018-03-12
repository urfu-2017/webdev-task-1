'use strict';
const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('f8c7968376984c3db60b4759fa20cfe4');

exports.getNews = (req, cb) => {
    const country = req.query.country || 'us';
    const options = {
        category: req.params.name,
        language: 'en',
        country: country,
        pageSize: 5
    };
    newsapi.v2.topHeadlines(options)
        .then(response => {
            cb(response);
        });
};
