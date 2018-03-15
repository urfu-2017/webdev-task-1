'use strict';

const Weather = require('../models/weather');

module.exports = async (req, res, next) => {
    res.locals.title = 'Новости';
    try {
        const { query } = req;
        const weathers = await Weather.findAll(
            { queryCity: query.query, lat: query.lat, lon: query.lon });
        res.locals.weathers = weathers;

        next();
    } catch (error) {
        next(error);
    }

};
