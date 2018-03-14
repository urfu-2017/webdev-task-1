'use strict';
const categories = require('../mocks/categories');
const { getNews } = require('../models/news');

async function listNews(req, res) {
    const locals = res.locals;
    const weatherList = res.locals.weather.weatherList;
    const news = await getNews(req);
    const data = { categories, locals, weatherList, news: news.articles };
    res.render('category', data);
}

module.exports = { listNews };
