'use strict';

const Weather = require('../models/weather');


module.exports.getWeather = async (req, res, next) => {
    req.locals.weather = await Weather.fetch(req.query);
    next();
};
