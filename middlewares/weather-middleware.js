'use strict';
const formatDate = require('./date-format');

const fetch = require('node-fetch');
const baseUrl = 'https://www.metaweather.com/api/';
const defaultCity = 'Moscow';

const getLocationId = async ({ query, lat, lon }) => {
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

module.exports = async (req, res, next) => {
    if (req.query) {
        try {
            const { query, lat, lon } = req.query;

            const locationId = await getLocationId({ query, lat, lon });
            const weather = await getWeather(locationId);

            res.locals.city = weather.title;
            res.locals.image = weather.consolidated_weather[0].weather_state_abbr;
            res.locals.tempToday = parseInt(weather.consolidated_weather[0].the_temp);
            res.locals.windToday = parseInt(weather.consolidated_weather[0].wind_speed);
            res.locals.dates = getInfo(weather.consolidated_weather, 'applicable_date', true);
            res.locals.temps = getInfo(weather.consolidated_weather, 'the_temp', false);
            res.locals.winds = getInfo(weather.consolidated_weather, 'wind_speed', false);
        } finally {
            next();
        }
    }
};
