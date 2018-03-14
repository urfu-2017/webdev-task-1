'use strict';

const WeatherModel = require('../models/weatherModel');

module.exports = async req => {
    const weather = new WeatherModel(req.query);
    const weatherData = await weather.get();

    return weatherData;
};
