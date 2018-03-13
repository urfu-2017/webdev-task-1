'use strict';

const data = require('../data');

exports.list = async (req, res) => {
    res.render('categories', {
        title: 'Илон слишком занят',
        categories: data.categories,
        weatherData: req.weatherData,
        dateOptions: {
            lang: 'ru'
        }
    });
};
