'use strict';

const NewsArticle = require('../models/news-article');
const Weather = require('../models/weather');

exports.list = async (req, res) => {
    const { query } = req;
    const { category } = req.params;
    const news = await NewsArticle.findAll({ category, country: query.country });
    const weathers = await Weather.findAll({ query: query.query, lat: query.lat, lon: query.lon });
    const data = { news, weathers };
    const resultData = Object.assign(data, res.locals);

    res.render('category', resultData);
};
