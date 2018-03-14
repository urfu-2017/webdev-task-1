'use strict';

const request = require('request');
const querystring = require('querystring');
const config = require('../config');

const URL = config.weatherURL;

function createRequestPromise(options) {
    return new Promise((resolve) => {
        request(options, (err, res, body) => {
            if (err) {
                return resolve(err);
            }

            return resolve(body);
        });
    });
}

function searchWeather(query) {
    let resultUrl = URL;
    if (query) {
        resultUrl += `search/?${query}`;
    }
    const options = {
        method: 'GET',
        url: resultUrl,
        json: true
    };

    return createRequestPromise(options);
}

function loadWeather(woeid) {
    const resultUrl = `${URL + woeid}/`;
    const options = {
        method: 'GET',
        url: resultUrl,
        json: true
    };

    return createRequestPromise(options);
}


function defaultQuery(queryCountry, lat, lon) {
    if (queryCountry) {
        return queryCountry;
    }
    if (!lat || !lon) {
        return config.defaultCity;
    }

    return undefined;
}

class Weather {
    constructor({
        temperature, date, windSpeed, stateName, city
    }) {
        this.temperature = temperature;
        this.date = date;
        this.windSpeed = windSpeed;
        this.stateName = stateName;
        this.city = city;
    }

    static async findAll({ queryCountry, lat, lon }) {
        queryCountry = defaultQuery(queryCountry, lat, lon);
        let query;
        if (queryCountry) {
            query = querystring.stringify({ query: queryCountry });
        } else if (lat && lon) {
            query = querystring.stringify({ lattlong: `${lat},${lon}` });
        }
        const { woeid } = (await searchWeather(query))[0];
        const data = await loadWeather(woeid);
        const weathers = data.consolidated_weather;
        const city = data.title;

        return weathers.map((weather) => {
            weather.temperature = Math.round(weather.the_temp);
            weather.date = weather.applicable_date;
            weather.windSpeed = Math.round(weather.wind_speed);
            weather.stateName = weather.weather_state_abbr;
            weather.city = city;

            return new Weather(weather);
        });
    }
}

module.exports = Weather;
