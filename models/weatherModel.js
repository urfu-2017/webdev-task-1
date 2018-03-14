'use strict';

const queryString = require('query-string');
const formatDate = require('../utils/date-format');
const fetch = require('node-fetch');
const baseURL = 'https://www.metaweather.com/api/location';
const defaultCity = 'Moscow';

const getLocationId = async (query, lat, lon) => {
    let currentURL = null;
    if (lat && lon) {
        currentURL = `${baseURL}/search/?${queryString.stringify({ lattlong:
            `${lat},${lon}` })}`;
    } else {
        const location = query || defaultCity;
        currentURL = `${baseURL}/search/?${queryString.stringify({ query: location })}`;
    }

    const response = await fetch(currentURL);
    const json = await response.json();

    return json[0].woeid;
};

const getWeather = async (placeId) => {
    const response = await fetch(`${baseURL}/${placeId}`);

    return await response.json();
};

const getWeatherValue = (data, field) => {
    const elements = [];
    if (data.length) {
        data.forEach(element => {
            elements.push(parseInt(element[field]));
        });
    }

    return elements.splice(1, 5);
};

const getDates = (data, field) => {
    const elements = [];
    if (data.length) {
        data.forEach(element => {
            elements.push(formatDate(element[field]));
        });
    }

    return elements.splice(1, 5);
};

class WeatherModel {
    constructor({ query, lat, lon }) {
        this.query = query;
        this.lat = lat;
        this.lon = lon;
    }

    async get() {
        const locationId = await getLocationId(this.query,
            this.lat, this.lon);
        const weather = await getWeather(locationId);
        const city = weather.title;
        const image = weather.consolidated_weather[0].weather_state_abbr;
        const tempToday = parseInt(weather.consolidated_weather[0].the_temp);
        const windToday = parseInt(weather.consolidated_weather[0].wind_speed);
        const dates = getDates(weather.consolidated_weather, 'applicable_date');
        const temps = getWeatherValue(weather.consolidated_weather, 'the_temp');
        const winds = getWeatherValue(weather.consolidated_weather, 'wind_speed');

        return { city, image, tempToday, windToday, dates, temps, winds };
    }
}

module.exports = WeatherModel;
