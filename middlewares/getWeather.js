'use strict';

let weather = require('../parsers/weatherParser');

exports.weather = async (req, res, next) => {
    req.weather = await weather.getWeather(req);
    next();
};
