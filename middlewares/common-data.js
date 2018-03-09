'use strict';

const config = require('config');
const Weather = require('../models/Weahter');

module.exports = async (req, res, next) => {
    const data = {}

    try {
        const weather = await getWeather(req.query);
        data.weather = weather;
    } catch (error) {
        data.weather = {
            place: error.message,
            weather: []
        };
    }

    data.staticBasePath = config.has('staticBasePath') ? config.get('staticBasePath') : '/';
    const layoutConfig = config.has('layoutConfig') ? config.get('layoutConfig') : {
        siteName: 'TEST',
        charset: "utf-8",
        lang: "en"
    };

    res.locals = Object.assign(res.locals, data, layoutConfig);

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
