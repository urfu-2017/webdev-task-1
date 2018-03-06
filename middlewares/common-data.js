'use strict';

const config = require('config');
const Weather = require('../models/Weahter');

module.exports = async (req, res, next) => {
    try {
        const weather = await getWeather(req.query);
        res.locals.weather = weather;
    } catch (error) {
        res.locals.weather = {
            place: error.message,
            weather: []
        };
    }

    res.locals.staticBasePath = config.get('staticBasePath');
    res.locals.siteName = config.get('siteName');

    next();
};

async function getWeather(query) {
    let weather = null;

    if (query.query) {
        weather = await Weather.getWeather({
            query: query.query
        });
    }

    if (query.lat && query.lon) {
        weather = await Weather.getWeather({
            lat: query.lat,
            lon: query.lon
        });
    }

    if (!weather) {
        weather = await Weather.getWeather({
            query: 'moscow'
        });
    }

    return weather;
}
