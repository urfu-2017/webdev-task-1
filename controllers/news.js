'use strict';

const config = require('config');

const News = require('../models/News');

const news = new News(config.get('newsUrl'), config.get('newsApiKey'));

exports.index = (req, res) => {
    const data = Object.assign({
        mainPage: true
    }, res.locals);

    res.render('index', data);
};

exports.newsCategory = async (req, res) => {
    if (!news.hasCategory(req.params.category)) {
        return res.sendStatus(404);
    }

    try {
        const country = req.query.country || 'ru';
        const articles = await news.get(req.params.category, country);
        const data = Object.assign({
            articles
        }, res.locals);

        res.render('news', data);
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
};
