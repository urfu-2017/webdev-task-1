'use strict';

// const wetherModel = require('../models/new');
const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('574326253ac74f489b5f5015089a3c66');


exports.getNews = (name, country) => {
    const countries = ['ru', 'au', 'at', 'be', 'br', 'ca', 'ua', 'gb', 'us'];
    if (!(country in countries)) {
        country = 'ru';
    }
    if (name === 'everything') {
        name = '';
    }
    // console.log(name, country);

    newsapi.v2.topHeadlines({
        category: name,
        language: 'ru',
        country: country
    }).then(response => {
        // console.log(response);
        return response;

    });


};

