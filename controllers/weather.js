'use strict';

const fetch = require('node-fetch');

const Widget = require('../models/weatherWidget').Widget;

const baseUrl = 'https://www.metaweather.com';

exports.getPlaces = ({ query, lat, lon }, cb) => {
    if (!lat || !lon) {
        query = query || 'moscow';
    }
    let url = makeSearchPlacesUrl({ query, lat, lon });

    fetch(url)
        .then(res => res.json())
        .then(listOfPlaces => getWeather(listOfPlaces[0]))
        .then(res => res.json())
        .then(weatherObj => cb(new Widget(weatherObj)))
        .catch(err => console.error(err));
};

function getWeather({ woeid }) {
    if (!woeid) {
        throw new Error('Weather parameters is not specified');
    }
    let url = makeWeatherUrl(woeid);

    return fetch(url);
}

function makeSearchPlacesUrl({ query, lat, lon }) {
    let searchParam = query ? `?query=${query}` : `?lattlong=${lat},${lon}`;

    return `${baseUrl}/api/location/search/${searchParam}`;
}

function makeWeatherUrl(woeid) {
    return `${baseUrl}/api/location/${woeid}/`;
}
