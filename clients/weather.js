'use strict';

const { format } = require('url');

const config = require('config');
const got = require('got');
const LRU = require('lru-cache');

const DayWeather = require('../models/weather');

const cache = new LRU({ maxAge: config.get('cacheMaxAge') });

module.exports = function getWeather(query, lat, lon) {
    const key = JSON.stringify({ query, lat, lon });
    if (cache.has(key)) {
        return Promise.resolve(cache.get(key));
    }

    return findWoeid(query, lat, lon)
        .then(woeid => format({
            host: config.get('weatherApiUrl'),
            pathname: `location/${woeid}/`
        }))
        .then(url => got(url, { json: true }))
        .then(response => {
            const body = response.body;

            return {
                city: body.title,
                today: createModel(body.consolidated_weather[0]),
                daily: body.consolidated_weather.slice(1).map(createModel)
            };
        })
        .then(result => {
            cache.set(key, result);

            return result;
        });
};

function findWoeid(query, lat, lon) {
    let params = query ? { query } : { lattlong: `${lat},${lon}` };
    let findUrl = format({
        host: config.get('weatherApiUrl'),
        pathname: 'location/search/',
        query: params
    });

    return got(findUrl, { json: true })
        .then(response => response.body[0].woeid)
        .catch((err) => {
            console.error(err);

            return config.get('defaultWoeid');
        });
}

function createModel(dayWeather) {
    return new DayWeather({
        date: dayWeather.applicable_date,
        temperature: dayWeather.the_temp,
        weatherStateAbbr: dayWeather.weather_state_abbr,
        windSpeed: dayWeather.wind_speed
    });
}
