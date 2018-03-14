'use strict';

const WeatherModel = require('../models/weatherModel');

module.exports = async (req, res, next) => {
    const weather = new WeatherModel(req.query);
    const weatherData = await weather.get();
    res.locals.weather = weatherData;
    next();
};
