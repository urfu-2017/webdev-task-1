'use strict';

const Weather = require('../models/weatherModel');
const document = require('../data.json');
const queryString = require('query-string');

module.exports = ({ query }, res) => {
    const weatherController = new Weather(query);

    weatherController
        .getWeather()
        .then(weather => {
            res.render('categories', {
                document,
                query: queryString.stringify(query),
                weather
            });
        });
};

