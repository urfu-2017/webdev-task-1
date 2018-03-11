'use strict';

const weatherProvider = require('../core/weather');
const config = require('../config');
const newsCategories = config.newsCategories;

exports.home = async (req, res) => {
    const weather = await weatherProvider.getWeatherInfoAsync(req);

    res.render('index',
        { weather: weather, categories: newsCategories, title: 'Новости и погода' });
};
