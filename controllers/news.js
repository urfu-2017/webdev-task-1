'use strict';

const { getNews } = require('../api/news');
const { getWeather } = require('../api/weather');
const { backText } = require('../config/default.json');

module.exports.news = async (req, res) => {
    res.locals.isMainPage = false;
    res.locals.backText = backText;
    res.locals.country = req.query.country;
    res.locals.news = await getNews(req.params.category, req.query.country);
    res.locals.weather = await getWeather(req.query);

    const data = Object.assign({}, res.locals);

    res.render('index', data);
};
