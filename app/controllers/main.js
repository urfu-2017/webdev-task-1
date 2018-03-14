'use strict';

const Weather = require('../models/weather');

exports.main = async (req, res, next) => {
    try {
        const weatherData = await Weather.fetch(res.locals.query);
        if (weatherData === null) {
            next(new Error('WEATHER_NOT_LOADED'));
        }
        res.render('main', {
            title: 'Главная страница',
            weather: weatherData,
            city: res.locals.query,
            country: res.locals.country
        });
    } catch (err) {
        next(new Error('MAINPAGE_ERROR'));
    }
};
