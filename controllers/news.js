'use strict';

const querystring = require('querystring');

const Article = require('../models/article');

exports.getNews = async (req, res) => {
    const articles = await Article.fetchAll(req.path.split('/')[2], req.query.country);

    res.render('news', {
        articles,
        'homelink': '/?' + querystring.stringify(req.query),
        weather: req.weatherInfo
    });
};

