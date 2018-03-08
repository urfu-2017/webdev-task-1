'use strict';

const Weather = require('../models/weather');
const Category = require('../models/category');
const News = require('../models/news');

exports.list = async (req, res, next) => {
    const category = req.params.category;

    if (!Category.exists(category)) {
        next();
    }

    let weather;
    try {
        weather = await Weather.filter(req.query);
    } catch (e) {
        res.status(500).send(e.message);

        return;
    }

    let news;
    try {
        news = await News.filter(category, req.query);
    } catch (e) {
        res.status(500).send(e.message);

        return;
    }

    res.render('page-news', {
        title: req.query.category,
        back: {
            url: '/',
            text: 'На главную'
        },
        weather,
        news
    });
};
