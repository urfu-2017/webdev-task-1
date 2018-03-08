'use strict';

const ArticleModel = require('../models/ArticleModel');
const weatherProvider = require('../core/weather');
const config = require('../config');
const NewsAPI = require('newsapi');
const newsapi = new NewsAPI(config.newsApiKey);

exports.news = async (req, res) => {
    const weather = await weatherProvider.getWeatherInfoAsync(req);

    const country = (req.query && req.query.country ? req.query.country : config.defaultCountry);
    const news = await newsapi.v2.topHeadlines({
        category: req.query.category,
        country: country
    }).then(r => r.articles.map(a =>
        new ArticleModel({
            source: a.source.name,
            title: a.title,
            description: a.description,
            urlToImage: a.urlToImage,
            publishedAt: a.publishedAt })));

    const data = { weather: weather, news: news, title: 'Новости' };

    res.render('index', data);
};
