'use strict';

const Weather = require('../models/weather');

const defaultPlace = 'Moscow';

module.exports = async (req, res, next) => {
    try {
        const { query, lat, lon } = req.query;
        let options = { query: defaultPlace };

        if (query || (lat && lon)) {
            options = { query, lat, lon };
        }

        res.locals.weatherData = await Weather.load(options);
    } catch (e) {
        res.locals.weatherData = { error: e.message };
    } finally {
        next();
    }
};
