'use strict';

const Categories = require('../models/categories');

exports.categories = function (req, res) {
    res.render('index', {
        categories: Categories.getData()
    });
};
