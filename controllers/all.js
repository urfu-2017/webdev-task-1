'use strict';

require('dotenv').config();
const NewsAPI = require('newsapi');
const newsapi = new NewsAPI(process.env.API_KEY);
const NewModel = require('../models/new');
// const categories = require('../mocks/categories.json');
const countries = ['ru', 'au', 'at', 'be', 'br', 'ca', 'ua', 'gb', 'us'];

exports.list = (req, res) => {
    res.render('index');
};

exports.news = (req, res) => {
    let name = req.params.name;
    let country = req.query.country;

    if (countries.indexOf(country) < 0) {
        country = 'ru';
    }
    if (name === 'everything') {
        name = '';
    }

    newsapi.v2.topHeadlines({
        category: name,
        language: country,
        country: country
    }).then(response => {
        let news = response.articles.map(element => {
            return new NewModel(
                element.title,
                element.publishedAt,
                element.description,
                element.source.name
            );
        });
        res.render('news', {
            news
        });
    });
};
