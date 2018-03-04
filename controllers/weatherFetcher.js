'use strict';

const fetch = require('node-fetch');
const { stringify } = require('querystring');

const Weather = require('../models/weather');


const MOSCOW_WOEID = 2122265;

exports.fetchWeather = query => {
    let querystring = parseWeatherQuery(query);

    return fetch(`${Weather.getBaseLink()}/api/location/search/?${querystring}`)
        .then(response => response.json())
        .then(json => json[0].woeid ? json[0].woeid : MOSCOW_WOEID)
        .catch(() => MOSCOW_WOEID)
        .then(woeid => fetch(`${Weather.getBaseLink()}/api/location/${woeid}/`))
        .then(response => response.json())
        .then(json => new Weather(json));
};

function parseWeatherQuery(query) {
    let newQuery = query.query ? { query: query.query } : {};
    if (query.lat && query.lon) {
        newQuery.lattlong = `${query.lat},${query.lon}`;
    }

    return stringify(newQuery);
}
