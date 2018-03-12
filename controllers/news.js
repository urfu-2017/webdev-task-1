'use strict';
const categories = require('../mocks/categories');
const { getNews } = require('../models/news');

function listNews(req, res) {
    const locals = res.locals;
    const weatherList = res.locals.weather.weatherList;
    const flag = 1;
    let data = { categories, flag, locals, weatherList };
    getNews(req, listOfNews => {
        data.news = listOfNews.articles;
        res.render('category', data);
    });
}

module.exports = { listNews };
