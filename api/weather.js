'use strict';

const config = require('config');
const fetch = require('node-fetch');

const Weather = require('../models/weather');

const API = config.get('weatherApi');

function parseWoeid(apiData) {
    return apiData['0'] === undefined
        ? undefined
        : apiData['0'].woeid;
}

function parseMetcast(apiData) {
    const location = apiData.title;
    const metcast = [];

    for (let i = 0; i < 5; i++) {
        const weatherData = apiData.consolidated_weather[i];
        const stateAbbr = weatherData.weather_state_abbr;

        const weather = new Weather({
            location,
            date: weatherData.applicable_date,
            temp: Math.round(weatherData.the_temp),
            state: { abbr: stateAbbr, name: API.states[stateAbbr] },
            windSpeed: Math.round(weatherData.wind_speed)
        });

        metcast.push(weather);
    }

    return metcast;
}

async function getMetcastAsync(request) {
    let apiData = await (await fetch(request)).json();
    const woeid = parseWoeid(apiData);

    if (woeid === undefined) {
        return undefined;
    }

    request = API.url + API.idSearch + String(woeid);
    apiData = await (await fetch(request)).json();
    const metcast = parseMetcast(apiData);

    return metcast === undefined
        ? { message: API.locationNotFound }
        : { today: metcast[0], metcast };
}

async function getWeatherByLoc(location) {
    const apiRequest = API.url + API.querySearch + location;

    return await getMetcastAsync(apiRequest);
}

async function getWeatherByCoords(lat, lon) {
    const apiRequest = API.url + API.lattlongSearch + `${lat},${lon}`;

    return await getMetcastAsync(apiRequest);
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
