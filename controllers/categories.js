'use strict';

const querystring = require('querystring');

const Category = require('../models/category');

exports.getCategories = (req, res) => {
    const query = querystring.stringify(req.query);
    const categories = Category.fetchAll(query);
    res.render('index', { categories, 'weather': req.weatherInfo });
};
