'use strict';

const News = require('../models/news');

exports.categories = (req, res) => {
    const categories = News.getCategories();

    res.render('index', {
        title: 'Главная',
        categories
    });
};
