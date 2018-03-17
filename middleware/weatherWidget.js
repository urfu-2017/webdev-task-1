'use strict';

const moment = require('moment');

const WeatherService = require('../dataAccess/weatherService');
const weatherService = new WeatherService();

exports.weatherWidget = async (req, res, next) => {
    const locationQuery = req.query.query;
    const lat = req.query.lat;
    const long = req.query.long;
    if (locationQuery) {
        await weatherService.setLocationByQuery(locationQuery);
    } else if (lat && long) {
        await weatherService.setLocationByLatLong({ lat, long });
    } else {
        await weatherService.setLocation(44418, 'London');
    }
    const weather = await weatherService.getWeather();
    res.locals.todayWeather = weather.find(w => w.date === moment().format('YYYY-MM-DD'));
    res.locals.weather = weather.filter(w => w.date !== moment().format('YYYY-MM-DD'));
    next();
};
