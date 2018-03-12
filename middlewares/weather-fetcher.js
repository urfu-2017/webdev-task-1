'use strict';

const fetch = require('node-fetch');
const { stringify } = require('querystring');

const Weather = require('../models/weather');
const { searchLocationLink, weatherLink } = require('../config/weather-api');

const MOSCOW_WOEID = 2122265;

exports.fetchWeather = (req, res, next) => {
    const querystring = parseWeatherQuery(req.query);

    return fetch(`${searchLocationLink}/?${querystring}`)
        .then(response => response.json())
        .then(json => json[0].woeid ? json[0].woeid : MOSCOW_WOEID)
        .catch(() => MOSCOW_WOEID)
        .then(woeid => fetch(`${weatherLink}/${woeid}/`))
        .then(response => response.json())
        .then(json => new Weather(json))
        .then(weather => {
            res.locals.weather = weather;
            next();
        });
};

function parseWeatherQuery(query) {
    let newQuery = query.query ? { query: query.query } : {};
    if (query.lat && query.lon) {
        newQuery.lattlong = `${query.lat},${query.lon}`;
    }

    return stringify(newQuery);
}
