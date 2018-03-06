'use strict';

const rp = require('request-promise');
const { URL } = require('url');

const DEFAULT_CITY = 'moscow';
const OPTIONS_OF_DATE_FORMAT = {
    month: 'long',
    day: 'numeric'
};
const { ERROR_PACKET, INCORRECT_PACKET, OK_PACKET, OPTIONS_OF_GET_REQUEST } =
    require('./common_settings');

function sendRequestForWeather(req) {
    const urlForPlace = new URL('https://www.metaweather.com/api/location/search/?');
    if (req.query.query) {
        urlForPlace.searchParams.append('query', req.query.query);
    } else if (req.query.lat !== undefined && req.query.lon !== undefined) {
        urlForPlace.searchParams.append('lattlong', `${req.query.lat},${req.query.lon}`);
    } else {
        urlForPlace.searchParams.append('query', DEFAULT_CITY);
    }
    const optionsForPlace = Object.assign({ url: urlForPlace }, OPTIONS_OF_GET_REQUEST);

    return rp(optionsForPlace)
        .then(resForPlace => {
            if (!Object.keys(resForPlace).length) {
                return {
                    metaWeather: INCORRECT_PACKET
                };
            }
            const urlForWoeid =
                new URL(`https://www.metaweather.com/api/location/${resForPlace[0].woeid}`);
            const optionsForWoeid = Object.assign({ url: urlForWoeid }, OPTIONS_OF_GET_REQUEST);

            return rp(optionsForWoeid)
                .catch(() => {
                    return {
                        metaWeather: ERROR_PACKET
                    };
                });
        })
        .catch(() => {
            return {
                metaWeather: ERROR_PACKET
            };
        });
}

function parseWeatherFromWoeidResponse(woeidResponse) {
    let currentDay = woeidResponse.consolidated_weather[0];
    let nextDays = woeidResponse.consolidated_weather.slice(1);

    return {
        metaWeather: OK_PACKET,
        locationName: woeidResponse.title,
        urlToWeatherPicture:
            `https://www.metaweather.com/static/img/weather/${currentDay.weather_state_abbr}.svg`,
        currentTemperature: Math.round(currentDay.the_temp),
        currentWind: Math.round(currentDay.wind_speed),
        nextWeather: nextDays.map(day => {
            return {
                date: createLocaleDate(new Date(day.applicable_date)),
                temperature: Math.round(day.the_temp),
                wind: Math.round(day.wind_speed)
            };
        })
    };
}

function createLocaleDate(date) {
    return date.toLocaleString('en', OPTIONS_OF_DATE_FORMAT);
}

module.exports.getWeather = async req => {
    let weather = await sendRequestForWeather(req);
    if (weather.metaWeather !== ERROR_PACKET && weather.metaWeather !== INCORRECT_PACKET) {
        weather = parseWeatherFromWoeidResponse(weather);
    }

    return weather;
};
