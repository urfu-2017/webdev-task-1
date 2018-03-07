'use strict';

const { getNews } = require('../api/news');
const { getWeather } = require('../api/weather');

module.exports.news = async (req, res) => {
    res.locals.news = await getNews(req.query);
    res.locals.weather = await getWeather(req.query);

    const data = Object.assign({}, res.locals);

    res.render('news', data);
};
