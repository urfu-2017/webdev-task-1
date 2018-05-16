'use strict';

const categories = require('../data/categories');
const metaData = require('../data/meta');
const indexPageData = require('../data/index-page');
const newsPageData = require('../data/news-page');
const getWeather = require('../models/get-weather');
const getNews = require('../models/get-news');

exports.indexPage = async (req, res) => {
    const weather = await getWeather(req.query);

    res.render('index', Object.assign({ weather, categories }, indexPageData, metaData));
};

exports.newsPage = async (req, res) => {
    const weather = await getWeather(req.query);
    const news = await getNews(
        req.country, req.params.category, process.env.NEWS_API_KEY
    );

    res.render('news', Object.assign(
        {
            header: req.params.category,
            weather,
            news: news.articles
        },
        newsPageData,
        metaData
    ));
};
