'use strict';

const { Weather } = require('../models/weather');


module.exports.getWeather = (req, res, next) => {
    req.locals.weather = Weather.fetch(req.query);
    next();
};
