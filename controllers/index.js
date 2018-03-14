/* eslint-disable strict, indent */

'use strict';

const config = require('config');
const Weather = require('../models/weather');

exports.main = async (req, res) => {
    const { query } = req;
    const weathers = await Weather.findAll({ query: query.query, lat: query.lat, lon: query.lon });
    const data = { weathers };
    res.locals.categories = config.get('categories');
    const resultData = Object.assign(data, res.locals);

    res.render('index', resultData);
};
