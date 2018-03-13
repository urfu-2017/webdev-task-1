'use strict';

const categories = require('../models/categories');

exports.categories = function (req, res) {
    res.render('index', {
        categories
    });
};
