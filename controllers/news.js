'use strict';

const ArticleModel = require('../models/ArticleModel');
const weatherProvider = require('../core/weather');
const config = require('../config');
const NewsAPI = require('newsapi');

const newsapi = new NewsAPI(config.newsApiKey);

module.exports = async (req, res) => {
    const weather = await weatherProvider.getWeatherInfoAsync(req);

    const country = req.query && req.query.country || config.defaultCountry;
    const news = await newsapi.v2.topHeadlines({
        category: req.query.category,
        country: country
    }).then(response => response.articles.map(article =>
        new ArticleModel({
            source: article.source.name,
            ...article })));

    res.render('index', { weather: weather, news: news, title: 'Новости' });
};
