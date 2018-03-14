'use strict';
const Categories = require('../models/categories');
const News = require('../models/news');

async function listNews(req, res) {
    const weatherList = res.locals.weather.weatherList;
    const news = await News.getNews(req);
    const categories = Categories.getCategories();
    const data = { categories, weatherList, news: news.articles };
    res.render('category', data);
}

module.exports = { listNews };
