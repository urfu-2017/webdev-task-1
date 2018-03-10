'use strict';

const { Category } = require('../models/category');
const { meta } = require('../utils/meta');

exports.list = (req, res) => {
    const categories = Category.loadAll('categories.json');
    const data = {
        categories: categories,
        meta,
        ...res.locals
    };
    res.render('index', data);
};
