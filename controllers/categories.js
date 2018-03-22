'use strict';

const { categories } = require('../models/category');
const { meta } = require('../utils/meta');
const { WeatherFetcher } = require('../models/weather');

exports.list = async (req, res) => {
    const weatherFetcher = new WeatherFetcher();
    const query = req.query;
    const weather = await weatherFetcher.getWeather(query);
    res.render('index', { categories, meta, weather });
};
