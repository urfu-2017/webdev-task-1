'use strict';

const Category = require('../models/category');
const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('574326253ac74f489b5f5015089a3c66');

exports.list = (req, res) => {
    res.locals.categories = Category.findAll();
    let data = res.locals;
    res.render('index', data);
};

exports.news = (req, res) => {
    var name = req.params.name;
    var country = req.query;

    var countries = ['ru', 'au', 'at', 'be', 'br', 'ca', 'ua', 'gb', 'us'];
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
        let data = res.locals;
        res.render('news', data);
    });
};
