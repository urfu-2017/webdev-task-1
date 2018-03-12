'use strict';

const Weather = require('../models/weather');
// const News = require('../models/news');

exports.start = (req, res) => {
    const query = req.query.query ? req.query.query : 'miami';
    const country = req.query.country ? req.query.country : 'ru';

    Weather.find(query)
        .then((result) => {
            res.setHeader('content-type', 'text/html');
            res.render('index', {
                weather: result,
                city: query,
                country: country

            });
        });
};
