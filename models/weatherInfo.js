'use strict';

/* eslint-disable */
const dateFormat = require('dateformat');
const querystring = require('querystring');
const nodeFetch = require('node-fetch');

const sourcePrefix = 'https://www.metaweather.com/api/location/';

class WeatherInfo {
    constructor({ title, consolidated_weather }) {
        const consolidatedWeather = consolidated_weather.map(this.formatWeatherInfo);

        const currentStateName = consolidatedWeather[0].weather_state_abbr;
        this.currentWeatherInfo = consolidatedWeather[0];
        this.nextDaysWeather = consolidatedWeather.slice(1);
        this.urlForIco = `https://www.metaweather.com/static/img/weather/${currentStateName}.svg`;
        this.locationName = title;
    }

    formatWeatherInfo(info) {
        info.applicable_date = dateFormat(info.applicable_date, 'd mmmm');
        info.the_temp = info.the_temp.toFixed(2);
        info.wind_speed = info.wind_speed.toFixed(2);

        return info;
    }

    static async fetch(latitude, longitude) {
        const locationId = await (WeatherInfo.getLocationIdAsync(latitude, longitude));
        const response = await nodeFetch(`${sourcePrefix}${locationId}`);
        const jsonWeatherInfo = await response.json();

        return new WeatherInfo(jsonWeatherInfo);
    }

    static async getLocationIdAsync(latitude, longitude) {
        const requestParams = querystring.stringify({ lattlong: `${latitude},${longitude}` });
        const response = await nodeFetch(`${sourcePrefix}search/?${requestParams}`);
        const locationInfo = await response.json();

        return locationInfo[0].woeid;
    }
}

module.exports = WeatherInfo;
