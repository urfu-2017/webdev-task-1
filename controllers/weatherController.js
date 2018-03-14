'use strict';

const categories = require('../config/common-data');
const WeatherModel = require('../models/weatherModel');
const frontPage = require('../mocks/front-page');

module.exports = async (req, res) => {
    const weather = new WeatherModel(req.query);
    const weatherData = await weather.get();
    res.locals.categories = categories;
    res.locals.weather = weatherData;
    res.render('index', frontPage);

    return;
};
