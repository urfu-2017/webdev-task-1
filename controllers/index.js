'use strict';

const category = require('../models/category');
const weather = require('../models/weather');

exports.categoriesList = (req, res) => {
    let categories = category.getAllCategories();
    weatherWidgetData(res)
        .then(() => {
            res.render('index', getRenderingData({ ...res.locals, categories }));
        });
};

exports.newsList = (req, res) => {
    let categoryName = req.params.category;
    let { country, language } = res.locals;

    let weatherPromise = weatherWidgetData(res);
    let articlesPromise = category.getArticles(categoryName, country, language);
    Promise.all([weatherPromise, articlesPromise])
        .then(data => {
            res.render('news', getRenderingData({ articles: data[1], ...res.locals }));
        });
};

function getRenderingData(partialData) {
    let currentYear = new Date().getFullYear();

    return { ...partialData, currentYear };
}

function weatherWidgetData(res) {
    return weather.getConsolidatedWeather().then(weatherData => {
        res.locals.weatherData = weatherData;
    });
}
