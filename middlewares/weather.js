'use strict';

const Weather = require('../models/weather');

const DEFAULT_QUERY_PARAMS = { query: 'moscow' };

const getQueryParams = requestQuery => {
    const { query, lat, lon } = requestQuery;

    if (query) {
        return { query };
    }

    if (lat && lon) {
        return { lattlong: `${lat},${lon}` };
    }

    return DEFAULT_QUERY_PARAMS;
};

module.exports = async (req, res, next) => {
    const params = getQueryParams(req.query);
    const weather = await Weather.getWeather(params);
    res.locals.weather = weather;

    next();
};
