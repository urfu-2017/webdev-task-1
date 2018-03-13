'use strict';

const config = require('../config/default');

const News = require('../models/news');
const Weather = require('../models/weather');

exports.news = async (req, res) => {
    const consolidatedWeather = await Weather.loadConsolidated(req.query);

    res.render('news', {
        title: 'Новости',
        categories: config.categories,
        consolidatedWeather: consolidatedWeather
    });
};

exports.category = async (req, res) => {
    const country = req.query.country;
    const category = req.params.category;

    const news = await News.loadAll(country, category);
    const consolidatedWeather = await Weather.loadConsolidated(req.query);

    res.render('categories', {
        title: category,
        news: news,
        consolidatedWeather: consolidatedWeather
    });
};
