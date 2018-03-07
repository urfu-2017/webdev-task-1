'use strict';

const Weather = require('../models/weather');

exports.loader = (req, res, next) => {
    Weather.getWeather(req.query)
        .then(weather => {
            res.locals.weather = weather;
        })
        .then(next);
};
