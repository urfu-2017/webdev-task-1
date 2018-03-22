'use strict';

const { News } = require('../models/news');
const { meta } = require('../utils/meta');
const { WeatherFetcher } = require('../models/weather');

exports.renderNews = async (req, res) => {
    const weatherFetcher = new WeatherFetcher();
    const query = req.query;
    const country = query.country || 'ru';
    const category = req.params.category;
    const weather = await weatherFetcher.getWeather(query);
    const articles = await News.getNews(category, country);
    res.render('news', { articles, meta, weather });
};
