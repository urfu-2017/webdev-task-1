'use strict';

const got = require('got');
const moment = require('moment');
require('moment/locale/ru');

const { url, defaultWoeid } = require('../weather-api');

module.exports.getWeatherByWoeid = function getWeatherByWoeid(woeid) {
    const weatherUrl = `${url}/location/${woeid}/`;

    return got(weatherUrl, { json: true })
        .then(response => {
            return {
                cityName: response.body.title,
                current: convertWeather(response.body.consolidated_weather[0]),
                week: response.body.consolidated_weather.slice(1).map(convertWeather)
            };
        });
};

function convertWeather(source) {
    let formattedTemp = Math.round(source.the_temp);
    if (formattedTemp >= 0) {
        formattedTemp = `+${formattedTemp}`;
    }

    return {
        temp: formattedTemp,
        wind: Math.round(source.wind_speed),
        date: prettifyDate(source.applicable_date),
        stateAbbr: source.weather_state_abbr
    };
}

function prettifyDate(source) {
    return moment(source).format('DD MMMM');
}

module.exports.searchLocation = function searchLocation(query) {
    const locationName = query.query;
    let queryString = '';

    if (locationName !== undefined) {
        queryString = `query=${locationName}`;
    } else if (query.lat !== undefined && query.lon !== undefined) {
        queryString = `lattlong=${query.lat},${query.lon}`;
    } else {
        return Promise.resolve(defaultWoeid);
    }
    const weatherUrl = `${url}/location/search/?${queryString}`;

    return got(weatherUrl, { json: true })
        .then(response => response.body[0].woeid)
        .catch(() => defaultWoeid);
};
