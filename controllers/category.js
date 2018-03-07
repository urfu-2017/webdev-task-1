'use strict';

const NewsArticle = require('../models/news-article');
const Weather = require('../models/weather');
const url = require('url');

exports.list = async function (req, res) {
    let query = url.parse(req.url, true).query;
    const category = req.params.category;
    const news = await NewsArticle.findAll(category, query.country);
    const weathers = await Weather.findAll(query.query, query.lat, query.lon);

    let data = { news, weathers };
    let resultData = Object.assign(data, res.locals);
    res.render('category', resultData);
};
