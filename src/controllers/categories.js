'use strict';

const Category = require('../models/category');

exports.list = (req, res) => {
    res.render('page-categories', {
        title: 'Главная страница',
        categories: Category.all()
    });
};
