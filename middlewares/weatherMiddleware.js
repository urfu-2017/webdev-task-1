'use strict';

const Weather = require('../models/weather');

module.exports = async (req, res, next) => {
    const { query, lat, lon } = req.query;

    res.weather = await Weather.getWeatherData(query, lat, lon);

    next();
};
