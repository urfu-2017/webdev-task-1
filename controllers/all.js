'use strict';

require('dotenv').config();
const NewsAPI = require('newsapi');
const newsapi = new NewsAPI(process.env.API_KEY);
const countries = ['ru', 'au', 'at', 'be', 'br', 'ca', 'ua', 'gb', 'us'];

exports.list = (req, res) => {
    res.render('index', res.locals);
};

exports.news = (req, res) => {
    let name = req.params.name;
    let country = req.query;

    if (!(country in countries)) {
        country = 'ru';
    }
    if (name === 'everything') {
        name = '';
    }

    newsapi.v2.topHeadlines({
        category: name,
        language: 'ru',
        country: country
    }).then(response => {
        res.locals.news = response.articles;
        res.render('news', res.locals);
    });
};
