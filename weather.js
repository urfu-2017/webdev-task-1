'use strict';

const got = require('got');

const defaultWoeid = 44418;

module.exports.getWeather = getWeather;

function getWeather(query, lat, lon) {
    return searchLocation(query, lat, lon)
        .then(getWeatherByWoeid);
}

function getWeatherByWoeid(woeid) {
    const weatherUrl = `https://www.metaweather.com/api/location/${woeid}/`;

    return got(weatherUrl, { json: true })
        .then(response => {
            return {
                cityName: response.body.title,
                current: convertWeather(response.body.consolidated_weather[0]),
                week: response.body.consolidated_weather.slice(1).map(convertWeather)
            };
        });
}

function convertWeather(source) {
    return {
        temp: Math.round(source.the_temp),
        wind: Math.round(source.wind_speed),
        date: prettifyDate(source.applicable_date),
        stateAbbr: source.weather_state_abbr
    };
}

function prettifyDate(source) {
    let [month, day] = source.split('-').slice(1);
    const months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
        'Июль', 'Август', 'Сентябрь', 'Ноябрь', 'Декабрь'];

    return parseInt(day) + ' ' + months[parseInt(month)];
}

function searchLocation(query, lat, lon) {
    let queryString = `query=${query}`;
    if (query === undefined) {
        queryString = `lattlong=${lat},${lon}`;
    }
    const weatherUrl = `https://www.metaweather.com/api/location/search/?${queryString}`;

    return got(weatherUrl, { json: true })
        .then(response => response.body[0].woeid)
        .catch(() => defaultWoeid);
}
