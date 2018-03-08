'use strict';
const categories = require('../mocks/categories');
const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('f8c7968376984c3db60b4759fa20cfe4');
// Каждый контроллер (controller) обычно экспортирует
// несколько функций-действий (actions)

exports.listCategories = (req, res) => {
    let locals = res.locals;
    let weatherList = res.locals.weather.weatherList;
    const data = { categories, locals, weatherList };
    res.render('index', data);

};

exports.listNews = (req, res) => {
    let locals = res.locals;
    let weatherList = res.locals.weather.weatherList;
    const flag = 1;
    let data = { categories, flag, locals, weatherList };
    let country = req.query.country || 'us';
    let options = {
        category: req.params.name,
        language: 'en',
        country: country
    };
    newsapi.v2.topHeadlines(options)
        .then(response => {
            data.news = response.articles.slice(0, 5);
            res.render('category', data);
        });
};
