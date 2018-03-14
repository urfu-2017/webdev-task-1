'use strict';

const { defaultWeatherCity, defaultNewsCountry } = require('../../config');

module.exports = (req, res, next) => {
    const { query = defaultWeatherCity, country = defaultNewsCountry } = req.query;
    res.locals.query = query;
    res.locals.country = country;
    next();
};
