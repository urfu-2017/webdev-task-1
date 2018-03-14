'use strict';

const config = require('../config');
const Weather = require('../models/weather');

exports.main = async (req, res) => {
    const query = { queryCountry: req.query.query, lat: req.query.lat, lon: req.query.lon };
    const weathers = await Weather.findAll(query);
    const data = { weathers };
    res.locals.categories = config.categories;
    const resultData = Object.assign(data, res.locals);

    res.render('index', resultData);
};
