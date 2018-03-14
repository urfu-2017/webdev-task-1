'use strict';
const categories = require('../models/categories');

function listCategories(req, res) {
    const weatherList = res.locals.weather.weatherList;
    const data = { categories, weatherList };
    res.render('index', data);
}

module.exports = { listCategories };
