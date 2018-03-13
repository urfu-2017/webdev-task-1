'use strict';

const fetch = require('node-fetch');
const url = require('url');

const Widget = require('./Widget');

const getWeather = (...location) => {
    let locationUrl = {
        protocol: 'https:',
        slashes: true,
        host: 'www.metaweather.com',
        pathname: '/api/location/search/'
    };

    if (location[1]) {
        locationUrl.search = `lattlong=${location[0]},${location[1]}`;
    } else {
        locationUrl.search = `query=${location}`;
    }

    let formatUrl = url.format(locationUrl);

    return fetch(formatUrl)
        .then(response => response.json())
        .then(body => body[0].woeid)
        .then(woeid => fetch(`https://www.metaweather.com/api/location/${woeid}/`))
        .then(response => response.json())
        .then(result => new Widget(result))
        .catch(error => console.error(error));
};

module.exports = getWeather;

