'use strict';
/* eslint linebreak-style: 0 */
const news = require('../models/news');
const weather = require('../models/weather');

exports.categoriesList = (req, res) => {
    let categories = news.getAllCategories();
    weather.getConsolidatedWeather()
        .then(weatherData => {
            res.render('category', getRenderingData({ ...res.locals, categories, weatherData }));
        });
};

exports.newsList = (req, res) => {
    let categoryName = req.params.category;
    let country = res.locals.defaultCountry;
    let language = res.locals.defaultLanguage;

    let weatherPromise = weather.getConsolidatedWeather();
    let articlesPromise = news.getNews(categoryName, country, language);
    Promise.all([weatherPromise, articlesPromise])
        .then(data => {

            res.render('news', getRenderingData(
                { weatherData: data[0], articles: data[1], ...res.locals }
            ));
        });
};

function getRenderingData(partialData) {
    let currentYear = new Date().getFullYear();

    return { ...partialData, currentYear };
}
