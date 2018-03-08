'use strict';

const categories = require('../common/categories.json');
const News = require('../models/news');

exports.news = (req, res) => {
    res.render('news', {
        title: 'Новости',
        categories: categories,
        ...res.locals
    });
};

exports.category = async (req, res) => {
    const country = req.query.country;
    const category = req.params.category;

    let news = await News.loadAll(country, category);

    res.render('categories', {
        title: category,
        news: news,
        ...res.locals
    });
};
