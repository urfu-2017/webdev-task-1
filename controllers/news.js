'use strict';
const categories = require('../models/categories');
const { getNews } = require('../models/news');

async function listNews(req, res) {
    const weatherList = res.locals.weather.weatherList;
    const news = await getNews(req);
    const data = { categories, weatherList, news: news.articles };
    res.render('category', data);
}

module.exports = { listNews };
