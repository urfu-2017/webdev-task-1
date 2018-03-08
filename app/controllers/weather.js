'use strict';

const Weather = require('../models/weather');

exports.show = (req, res) => {
    const query = req.query.query ? req.query.query : 'miami';

    Weather.find(query)
        .then((result) => {
            res.setHeader('content-type', 'text/html');
            res.render('weather', {
                weather: result
            });
        });
};

exports.start = (req, res) => {
    const query = req.query.query ? req.query.query : 'miami';

    Weather.find(query)
        .then((result) => {
            res.setHeader('content-type', 'text/html');
            res.render('index', {
                weather: result
            });
        });
};
