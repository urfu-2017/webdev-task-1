'use strict';

const NewsCategory = require('../models/news-category');

exports.list = (req, res) => {
    const categories = NewsCategory.all();

    res.render('news-categories', categories);
};
