'use strict';

const Weather = require('../models/weather');
const url = require('url');

exports.main = async function (req, res) {
    let query = url.parse(req.url, true).query;
    const weathers = await Weather.findAll(query.query, query.lat, query.lon);
    let data = { weathers };
    let resultData = Object.assign(data, res.locals);

    res.render('index', resultData);
};
