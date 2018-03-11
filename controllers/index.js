'use strict';

const categories = require('../content/categories.json');

exports.index = function (req, res) {
    res.render('index', {
        categories
    });
};
