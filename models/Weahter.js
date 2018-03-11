'use strict';

const requestify = require('requestify');

class Weather {
    constructor(url) {
        this._url = url;
    }

    async getWeather({ query, lat, lon }) {
        const queryString = query
            ? `query=${query}`
            : `lattlong=${lat},${lon}`;

        const woeid = await this._searchWoeid(queryString);

        return this._getWeatherByWoeid(woeid);
    }

    async _getWeatherByWoeid(woeid) {
        const weather = await requestify.get(
            `${this._url}/location/${woeid}/`
        );
        weather.getBody();
        const weatherJson = JSON.parse(weather.body);

        return {
            place: weatherJson.title,
            days: weatherJson.consolidated_weather
        };
    }

    async _searchWoeid(query) {
        const searchResponse = await requestify.get(
            `${this._url}/location/search/?${query}`
        );
        searchResponse.getBody();
        const searchJson = JSON.parse(searchResponse.body);

        if (!searchJson.length) {
            throw new Error('Can\'t find place!');
        }

        return searchJson[0].woeid;
    }
}

module.exports = Weather;
