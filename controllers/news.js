'use strict';

const ArticleModel = require('../models/ArticleModel');
const weatherProvider = require('../core/weather');
const config = require('../config');
const NewsAPI = require('newsapi');
const newsapi = new NewsAPI(config.newsApiKey);

exports.news = async (req, res) => {
    const weather = await weatherProvider.getWeatherInfoAsync(req);

<<<<<<< HEAD
    const country = (req.query && req.query.country ? req.query.country : config.defaultCountry);
    const news = await newsapi.v2.topHeadlines({
        category: req.query.category,
        country: country
    }).then(r => r.articles.map(a =>
=======
    const country = (req.query && req.query.country ? req.query.country : config.defaultCountry)
    const news = await newsapi.v2.topHeadlines({
        category: req.query.category,
        country: country
    }).then(r => r.articles.map(a => 
>>>>>>> d0bcf3b751c29eb912b7f41defd500be38bfebda
        new ArticleModel({
            source: a.source.name,
            title: a.title,
            description: a.description,
            urlToImage: a.urlToImage,
<<<<<<< HEAD
            publishedAt: a.publishedAt })));
=======
            publishedAt: a.publishedAt})))
>>>>>>> d0bcf3b751c29eb912b7f41defd500be38bfebda

    const data = { weather: weather, news: news, title: 'Новости' };

    res.render('index', data);
};
