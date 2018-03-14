'use strict';
// Того линтер требует, в конфиге изначальном
const Weather = require('../models/weather');

exports.main = async (req, res, next) => {
    try {
        const weatherData = await Weather.fetch(res.locals.query);
        if (weatherData !== null) {
            res.render('main', {
                title: 'Главная страница',
                weather: weatherData,
                city: res.locals.query,
                country: res.locals.country
            });
        } else {
            next('error');
        }
    } catch (err) {
        console.error(err);
    }
};
