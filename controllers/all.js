'use strict';

require('dotenv').config();
const NewsAPI = require('newsapi');
const newsapi = new NewsAPI(process.env.API_KEY);
const countries = ['ru', 'au', 'at', 'be', 'br', 'ca', 'ua', 'gb', 'us'];
const { getWeather } = require('../middleWeatherCorrecter/getweather');

exports.list = (req, res) => {
    let weather = getWeather(req.query);
    res.render('index', {
        charset: 'utf-8',
        title: 'Погода',
        today: weather[0],
        forecast: weather.slice(0, 5)
    });
};

exports.news = (req, res) => {
    let name = req.params.name;
    let weather = getWeather(req.query, res);
    let country = req.query.country;

    if (countries.indexOf(country) < 0) {
        country = 'ru';
    }
    if (name === 'everything') {
        name = '';
    }

    newsapi.v2.topHeadlines({
        category: name,
        language: country,
        country: country
    }).then(response => {
        res.render('news', {
            charset: 'utf-8',
            title: 'Новости',
            news: response.articles,
            today: weather[0],
            forecast: weather.slice(0, 5)
        });
    });
};
