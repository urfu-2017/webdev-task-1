'use strict';

const category = require('../models/category');
const weather = require('../models/weather');

exports.categoriesList = (req, res) => {
    let categories = category.getAllCategories();
    weather.getConsolidatedWeather()
        .then(weatherData => {
            res.render('category', getRenderingData({ ...res.locals, categories, weatherData }));
        });
};

exports.newsList = (req, res) => {
    let categoryName = req.params.category;
    let { country, language } = res.locals;

    let weatherPromise = weather.getConsolidatedWeather();
    let articlesPromise = category.getArticles(categoryName, country, language);
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

