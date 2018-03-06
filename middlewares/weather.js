'use strict';

const getWeather = require('../models/weather');

module.exports = (req, res, next) => {
    getWeather(req.query.query, req.query.lat, req.query.lon)
        .then(weather => {
            res.locals.weather = weather;
        })
        .then(next);
};
