'use strict';

const { getNews } = require('../models/news');
const { getWeather } = require('../models/weather');

exports.renderNews = async (req, res) => {
    let news = await getNews(req);
    let weather = await getWeather(req);
    let container = {};
    Object.assign(container, weather);
    Object.assign(container, { news });
    res.render('news', container);
}
