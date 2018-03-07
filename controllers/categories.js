'use strict';

const data = require('../data');
// const weather = require('../models/weather');

exports.list = (req, res) => {
    // weather.WeatherManager.getWeatherData({query: 'london'}).then((response) => {
    // });
    res.render('categories', {
        title: 'Илон слишком занят',
        categories: data.categories
    });
};
