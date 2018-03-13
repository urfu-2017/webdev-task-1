'use strict';

const got = require('got');

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
    return {
        temp: Math.round(source.the_temp),
        wind: Math.round(source.wind_speed),
        date: prettifyDate(source.applicable_date),
        stateAbbr: source.weather_state_abbr
    };
}

function prettifyDate(source) {
    const [month, day] = source.split('-').slice(1);
    const months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
        'Июль', 'Август', 'Сентябрь', 'Ноябрь', 'Декабрь'];

    return parseInt(day) + ' ' + months[parseInt(month)];
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
