'use strict';

const config = require('config');
const Weather = require('../models/Weahter');
const layoutData = require('../layoutData');

const weather = new Weather(config.get('weatherUrl'));

module.exports = async (req, res, next) => {
    const data = {};

    try {
        const weatherResult = await getWeather(req.query);
        data.weather = weatherResult;
    } catch (error) {
        data.weather = {
            place: error.message,
            weather: []
        };
    }

    data.staticBasePath = config.has('staticBasePath') ? config.get('staticBasePath') : '/';
    res.locals = Object.assign(res.locals, data, layoutData);

    next();
};

async function getWeather(query) {
    let weatherResult = null;

    if (query.query) {
        weatherResult = await weather.getWeather({
            query: query.query
        });
    }

    if (query.lat && query.lon) {
        weatherResult = await weather.getWeather({
            lat: query.lat,
            lon: query.lon
        });
    }

    if (!weatherResult) {
        weatherResult = await weather.getWeather({
            query: 'moscow'
        });
    }

    return weatherResult;
}
