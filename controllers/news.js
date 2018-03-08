'use strict'

const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('6722596c14cc49e49de9816ec3f5a236');
const ArticleModel = require('../models/ArticleModel');
const weatherProvider = require('./weather');

exports.news = async (req, res) => {
    const weather = await weatherProvider.getWeatherInfoAsync(req);

    const country = (req.query && req.query.country ? req.query.country : 'gb')
    const news = await newsapi.v2.topHeadlines({
        category: req.query.category,
        country: country
    }).then(r => r.articles.map(a => 
        new ArticleModel(a.source.name, a.title, a.description, a.urlToImage, a.publishedAt)))

    const data = { weather: weather, news: news, ...res.locals };

    res.render('index', data);
}