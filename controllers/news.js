'use strict';
const generic = require('../data/generic');
const header = require('../data/header');
const footer = require('../data/footer');
const { Weather } = require('../models/weather');
const { News } = require('../models/news');

exports.news = (req, res) => {
    const data = {};
    Object.assign(data, generic, header, footer);
    data.toHomeVisible = true;
    const category = req.params.category;
    const country = req.query.country || 'ru';
    let weatherPromise = Weather.getWeather(req)
        .then((weather) => {
            Object.assign(data, weather);
        });
    let newsPromise = News.getNews(country, category)
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
