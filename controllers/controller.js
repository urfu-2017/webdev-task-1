'use strict';

const { getWeather } = require('../models/weather');
const { getNews } = require('../models/news');
const fs = require('fs');

module.exports.main = async (req, res) => {
    const dataWeather = await getWeather(req);
    const dataMain = JSON.parse(fs.readFileSync('./public/data.json'));
    res.render('main', { dataMain, dataWeather });
};

module.exports.news = async (req, res) => {
    const dataNews = await getNews(req);
    const dataWeather = await getWeather(req);
    res.render('news', { dataNews, dataWeather });
};
