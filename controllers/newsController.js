'use strict';
const News = require('../models/news.js');
const weatherModels = require('../models/weather.js');

module.exports = async (req, res) => {
    const weather = await weatherModels.getWeather(req.query);
    const info = weather.info;

    let article = await News.getNews(req);
    Object.assign(article, {
        info: info,
        weather: weather
    });
    res.render('news', article);

};

