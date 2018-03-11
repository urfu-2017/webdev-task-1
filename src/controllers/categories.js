'use strict';

const Weather = require('../models/weather');
const Category = require('../models/category');

async function list(req, res) {
    res.render('page-categories', {
        categories: Category.all(),
        weather: await Weather.get(req.query)
    });
}

module.exports = { list };
