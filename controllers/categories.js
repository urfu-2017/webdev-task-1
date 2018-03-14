'use strict';
const Categories = require('../models/categories');

function listCategories(req, res) {
    const weatherList = res.locals.weather.weatherList;
    const categories = Categories.getCategories();
    const data = { categories, weatherList };
    res.render('index', data);
}

module.exports = { listCategories };
