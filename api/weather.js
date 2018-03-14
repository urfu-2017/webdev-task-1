'use strict';

const fetch = require('node-fetch');
const moment = require('moment');
const querystring = require('querystring');

const Weather = require('../models/weather');
const config = require('../config/default.json');

const API = config.weatherApi;

moment.locale(config.lang);

function parseWoeid(apiData) {
    return apiData['0'] && apiData['0'].woeid;
}

function parseMetcast(apiData) {
    const location = apiData.title;
    const metcast = [];

    for (let i = 0; i < 5; i++) {
        const weatherData = apiData.consolidated_weather[i];
        const stateAbbr = weatherData.weather_state_abbr;
        const temp = Math.round(weatherData.the_temp);
        const date = moment(weatherData.applicable_date);

        const weather = new Weather({
            location,
            date: date.format('D MMMM').toLowerCase(),
            temp: temp > 0 ? `+${temp}` : `${temp}`,
            state: { abbr: stateAbbr, name: API.states[stateAbbr] },
            windSpeed: Math.round(weatherData.wind_speed)
        });

        metcast.push(weather);
    }

    return metcast;
}

async function getMetcastAsync(query) {
    let requestUrl = API.url + API.locationSearch + query;
    let apiData = await fetch(requestUrl).then(result => result.json());
    const woeid = parseWoeid(apiData);

    if (woeid === undefined) {
        return undefined;
    }

    query = String(woeid);
    requestUrl = API.url + API.idSearch + query;
    apiData = await fetch(requestUrl).then(result => result.json());
    const metcast = parseMetcast(apiData);

    return metcast
        ? { today: metcast[0], metcast }
        : { message: API.locationNotFound };
}

async function getWeatherByLoc(location) {
    const query = querystring.stringify({ query: location });

    return await getMetcastAsync(query);
}

async function getWeatherByCoords(lat, lon) {
    const query = querystring.stringify({ lattlong: `${lat},${lon}` });

    return await getMetcastAsync(query);
}

module.exports.getWeather = async ({ query, lat, lon }) => {
    let weather = { message: API.locationRequired };

    if (lat && lon) {
        weather = await getWeatherByCoords(lat, lon);
    } else if (query) {
        weather = await getWeatherByLoc(query);
    }

    return weather;
};
