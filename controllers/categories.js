'use strict';
const categories = require('../mocks/categories');

function listCategories(req, res) {
    const locals = res.locals;
    const weatherList = res.locals.weather.weatherList;
    const data = { categories, locals, weatherList };
    res.render('index', data);
}

module.exports = { listCategories };
