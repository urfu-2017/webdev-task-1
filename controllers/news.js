'use strict';
const categories = require('../mocks/categories');
const { getNews } = require('../models/news');

async function listNews(req, res) {
    const locals = res.locals;
    const weatherList = res.locals.weather.weatherList;
    let data = { categories, locals, weatherList };
    let news = await getNews(req);
    data.news = news.articles;
    res.render('category', data);
}

module.exports = { listNews };
