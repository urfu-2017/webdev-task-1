'use strict';

const WeatherModel = require('../models/weatherModel');

module.exports = async (req, res, next) => {
    const { query, lat, lon } = req.query;
    const weather = new WeatherModel({ query, lat, lon });
    const weatherData = await weather.get();
    res.locals.city = weatherData.city;
    res.locals.image = weatherData.image;
    res.locals.tempToday = weatherData.tempToday;
    res.locals.windToday = weatherData.windToday;
    res.locals.dates = weatherData.dates;
    res.locals.temps = weatherData.temps;
    res.locals.winds = weatherData.winds;
    next();
};
