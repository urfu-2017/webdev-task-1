'use strict';

const Weather = require('../models/weather');

exports.loader = async (req, res, next) => {
    res.locals.weather = await Weather.getData(req.query);
    next();
};
