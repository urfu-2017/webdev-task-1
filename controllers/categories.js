'use strict';

const Category = require('../models/category');

exports.list = (req, res) => {
    const categories = Category.getAll();
    const data = { categories, ...res.locals };

    res.render('index', data);
};
