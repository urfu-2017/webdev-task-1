'use strict';

const Weather = require('../models/weather');

module.exports = async (req, res, next) => {
    res.locals.title = 'Новости';
    const { query } = req;
    const weathers = await Weather.findAll(
        { queryCountry: query.query, lat: query.lat, lon: query.lon });
    res.locals.weathers = weathers;

    next();
};
