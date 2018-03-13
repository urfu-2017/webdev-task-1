'use strict';
const formatDate = require('../config/date-format');

const fetch = require('node-fetch');
const baseUrl = 'https://www.metaweather.com/api/';
const defaultCity = 'Moscow';

const getLocationId = async (query, lat, lon) => {
    let url = null;

    if (lat && !Number.isNaN(lat) && lon && !Number.isNaN(lon)) {
        url = baseUrl + `location/search/?lattlong=${lat},${lon}`;
    } else {
        url = baseUrl + `location/search/?query=${query || defaultCity}`;
    }

    const response = await fetch(url);
    const json = await response.json();

    return json[0].woeid;
};

const getWeather = async (placeId) => {
    const response = await fetch(baseUrl + `/location/${placeId}`);
    const json = await response.json();

    return json;
};

const getInfo = (oldArray, field, isDate) => {
    const elements = [];
    oldArray.forEach(element => {
        if (isDate) {
            elements.push(formatDate(element[field]));
        } else {
            elements.push(parseInt(element[field]));
        }
    });

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
        const dates = getInfo(weather.consolidated_weather, 'applicable_date', true);
        const temps = getInfo(weather.consolidated_weather, 'the_temp', false);
        const winds = getInfo(weather.consolidated_weather, 'wind_speed', false);

        return { city, image, tempToday, windToday, dates, temps, winds };
    }
}

module.exports = WeatherModel;
