'use strict';
const fetch = require('node-fetch');
const baseUrl = 'https://www.metaweather.com/api/location/';
const Weather = require('../models/weather').Weather;

function buildUrl(options) {
    if (options.lat && options.lon) {
        let lattlong = options.lat + ',' + options.lon;

        return 'https://www.metaweather.com/api/location/search/?lattlong=' + lattlong;
    } else if (options.query) {
        return 'https://www.metaweather.com/api/location/search/?query=' + options.query;
    }

    return 'https://www.metaweather.com/api/location/search/?query=london';
}

exports.getWeather = (options, cb) => {
    let url = buildUrl(options);
    fetch(url)
        .then(u => u.json())
        .then(weatherData => {
            let woeidUrl = baseUrl + weatherData[0].woeid + '/';

            return fetch(woeidUrl);
        })
        .then(data => data.json())
        .then(
            function (weatherData) {
                cb(new Weather(weatherData));
            }
        );
};
