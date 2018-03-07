'use strict';
const fetch = require('node-fetch');
const baseUrl = 'https://www.metaweather.com/api/location/44418/';
const Weather = require('../models/weather').Weather;

exports.getWeather = (options, cb) => {
    // let query = options.query || 'London';
    // let lat = options.latt;
    // let lon = options.long;
    fetch(baseUrl).then(
        function (u) {
            return u.json();
        })
        .then(
            function (weatherData) {
                cb(new Weather(weatherData));
            }
        );
};
