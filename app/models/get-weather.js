'use strict';
const fetch = require('node-fetch');
const querystring = require('querystring');

const API_ENDPOINT = {
    protocol: 'https',
    host: 'www.metaweather.com',
    basePath: '/api',
    locationPath: '/location/search',
    weatherPath: '/location'
};

async function fetchEndpoint(url) {
    try {
        const response = await fetch(url);

        return await response.json();
    } catch (e) {
        console.error(e);

        return null;
    }
}

async function fetchLocationEndpoint(params) {
    const url = `${API_ENDPOINT.protocol}://${API_ENDPOINT.host}` +
        `${API_ENDPOINT.basePath}${API_ENDPOINT.locationPath}?${params}`;

    return fetchEndpoint(url);
}

async function getWOEIDByCoordinates({ lat, lon }) {
    const params = querystring.stringify({ lattlong: `${lat},${lon}` });
    const locations = await fetchLocationEndpoint(params);

    return locations[0].woeid;
}

async function getWOEIDByName({ name }) {
    const params = querystring.stringify({ query: name });
    const locations = await fetchLocationEndpoint(params);

    return locations[0].woeid;
}

async function fetchWeatherEndpoint(woeid) {
    const url = `${API_ENDPOINT.protocol}://${API_ENDPOINT.host}` +
        `${API_ENDPOINT.basePath}${API_ENDPOINT.weatherPath}/${woeid}`;

    return fetchEndpoint(url);
}

module.exports = async query => {
    let woeid;
    if (query.lat && query.lon) {
        woeid = await getWOEIDByCoordinates({ lat: query.lat, lon: query.lon });
    } else if (query.query) {
        woeid = await getWOEIDByName({ name: query.query });
    } else {
        woeid = 2487956; // San Francisco
    }

    return await fetchWeatherEndpoint(woeid);
};
