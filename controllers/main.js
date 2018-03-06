'use strict';

const Weather = require('../models/weather');
const News = require('../models/news');

const category = [
    { name: 'business' },
    { name: 'entertainment' },
    { name: 'general' },
    { name: 'health' },
    { name: 'science' },
    { name: 'sports' },
    { name: 'technology' }
];

exports.main = async (req, res) => {
    const locals = res.locals;

    const weatherJSON = await Weather.getWeatherJSON(req);
    const weather = Weather.getWeatherData(weatherJSON);

    const data = { weather, category, locals };

    res.render('index', data);
};

exports.news = async (req, res) => {
    const locals = res.locals;

    const weatherJSON = await Weather.getWeatherJSON(req);
    const weather = Weather.getWeatherData(weatherJSON);

    const newsJSON = await News.getNewsJSON(req);
    const news = News.getNewsData(newsJSON);

    const data = { weather, news, locals };

    res.render('news_category', data);
};
