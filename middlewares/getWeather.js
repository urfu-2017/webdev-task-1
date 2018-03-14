'use strict';

const Weather = require('../models/weather');

exports.weather = async (req, res, next) => {
    req.weather = await Weather.getWeather(req);
    next();
};
