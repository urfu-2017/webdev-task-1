'use strict';
const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('7003d399f6ae49cbbd75437b2fb4d33a');

module.exports = async (req, res1) => {
    let country = req.query.country || 'ru';
    let category = req.params.category;
    const article = await newsapi.v2.topHeadlines({
        category: category.toString(),
        language: req.headers['accept-language'],
        country: country.toString()
    });
    res1.render('news', article);
};

