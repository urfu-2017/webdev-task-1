'use strict';
const generic = require('../data/generic');
const header = require('../data/header');
const footer = require('../data/footer');
const { WeatherWidget } = require('../widgets/weather');
const { NewsModel } = require('../models/news');

exports.news = (req, res) => {
    const data = {};
    Object.assign(data, generic);
    Object.assign(data, header);
    data.toHomeVisible = true;
    Object.assign(data, footer);
    const weatherWidget = new WeatherWidget();
    const newsModel = new NewsModel();
    const category = req.params.category;
    const country = req.query.country === undefined ? 'ru' : req.query.country;
    let weatherPromise = weatherWidget.getWeather(req)
        .then((weather) => {
            Object.assign(data, weather);
        });
    let newsPromise = newsModel.getNews(country, category)
        .then((news) => {
            Object.assign(data, { news });
        });
    Promise.all([newsPromise, weatherPromise])
        .then(() => {
            res.render('news', data);
        })
        .catch((err) => {
            console.error(err);
            res.sendStatus(500);
        });
};
