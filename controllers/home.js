'use strict';

const weatherProvider = require('../core/weather');
const config = require('../config');

const categories = config.newsCategories;

module.exports = async (req, res) => {
    const weather = await weatherProvider.getWeatherInfoAsync(req);

    res.render('index', { weather, categories, title: 'Новости и погода' });
};
