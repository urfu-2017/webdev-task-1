'use strict';

const fetch = require('node-fetch');

class Weather {
    static async getWeatherJSON(req) {
        const query = req.query.query;
        const lat = req.query.lat;
        const lon = req.query.lon;
        const searchBaseUrl = 'https://www.metaweather.com/api/location/search/?';
        let searchUrl = '';
        if (query) {
            searchUrl = searchBaseUrl + 'query=' + query;
        } else if (lat && lon) {
            searchUrl = searchBaseUrl + 'lattlong=' + lat + ',' + lon;
        } else {
            searchUrl = searchBaseUrl + 'query=London';
        }
        const searchResponse = await fetch(searchUrl);
        const searchJson = await searchResponse.json();
        const locationBaseUrl = 'https://www.metaweather.com/api/location/';
        const locationUrl = locationBaseUrl + searchJson[0].woeid;
        const locationResponse = await fetch(locationUrl);

        return await locationResponse.json();
    }
}

module.exports = Weather;
