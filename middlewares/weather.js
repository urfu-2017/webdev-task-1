'use strict';

const WeatherInfo = require('../models/weatherInfo');

exports.getCurrentWeather = async (req, res, next) => {
    if (req.query.lat === undefined || req.query.lat === undefined) {
        next();

        return;
    }

    req.weatherInfo = await WeatherInfo.fetch(req.query.lat, req.query.lon);
    next();
};
