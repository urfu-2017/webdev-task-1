'use strict';

const News = require('../models/news');
const Weather = require('../models/weather');

exports.findList = async (req, res) => {
    try {
        const weatherData = await Weather.fetch(res.locals.query);
        const news = await News.find({ category: req.params.category,
            country: res.locals.country });
        res.render('news', {
            title: 'Новости по теме ' + req.params.category,
            weather: weatherData,
            news: news.articles,
            city: res.locals.query,
            country: res.locals.country,
            category: res.locals.category
        });
    } catch (error) {
        console.error(error);
    }
};
