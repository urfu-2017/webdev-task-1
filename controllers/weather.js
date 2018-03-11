'use strict';

const fetch = require('node-fetch');

const Widget = require('../models/weatherWidget');
const config = require('../config/default');

exports.getPlaces = ({ query, lat, lon }) => {
    if (!lat || !lon) {
        query = query || 'moscow';
    }
    let url = makeSearchPlacesUrl({ query, lat, lon });

    return fetch(url)
        .then(res => res.json())
        .then(listOfPlaces => getWeather(listOfPlaces[0]))
        .then(res => res.json())
        .then(weatherObj => new Widget(weatherObj));
};

/**
 * @param {String} woeid - Where on Earth id
 * @returns {Promise}
 */
function getWeather({ woeid }) {
    if (!woeid) {
        throw new Error('Weather parameters is not specified');
    }
    let url = makeWeatherUrl(woeid);

    return fetch(url);
}

function makeSearchPlacesUrl({ query, lat, lon }) {
    let searchParam = query ? `?query=${query}` : `?lattlong=${lat},${lon}`;

    return `${config.weatherLocationUrl}/search/${searchParam}`;
}

function makeWeatherUrl(woeid) {
    return `${config.weatherLocationUrl}/${woeid}`;
}
