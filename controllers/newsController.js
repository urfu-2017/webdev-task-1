'use strict';
const defaultCountry = 'us';
const NewsModel = require('../models/newsModel');
const WeatherModel = require('../models/weatherModel');

module.exports = async (req, res) => {
    const news = new NewsModel(req.query.country || defaultCountry, req.params.category);
    const weather = new WeatherModel(req.query);
    const fetchedData = await Promise.all([news.get(), weather.get()]);
    res.locals.newsArticles = fetchedData[0];
    res.locals.weather = fetchedData[1];
    res.render('category');

    return;
};
