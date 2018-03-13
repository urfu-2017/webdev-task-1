'use strict';

const { searchLocation, getWeatherByWoeid } = require('../models/weather');

module.exports.getWeather = function getWeather(req, res, next) {
    return searchLocation(req.query)
        .then(getWeatherByWoeid)
        .then(result => {
            res.locals.weather = result;
        })
        .then(next);
};
