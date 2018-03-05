'use strict';

const config = require('config');
const fetch = require('node-fetch');

const Weather = require('../models/weather');

const API = config.get('weatherApi');

function parseWoeid(apiData) {
    let woeid = apiData.json().woeid;

    if (woeid === undefined) {
        if (apiData['0'] === undefined) {
            return undefined;
        }

        woeid = apiData['0'].woeid;
    }

    return woeid;
}

function parseMetcast(apiData) {
    const location = apiData.title;
    const metcast = [];

    for (let i = 0; i < 5; i++) {
        const weatherData = apiData.consolidated_weather;
        const weather = new Weather({
            location,
            date: weatherData.applicable_date,
            temp: Math.round(weatherData.the_temp),
            state: weatherData.weather_state_abbr,
            windSpeed: weatherData.wind_speed
        });

        metcast.push(weather);
    }

    return metcast;
}

async function getMetcastAsync(request) {
    let apiData = (await fetch(request)).json();
    const woeid = parseWoeid(apiData);

    if (woeid === undefined) {
        return undefined;
    }

    request = API.url + API.idSearch + String(woeid);
    apiData = (await fetch(request)).json();

    return parseMetcast(apiData);
}

module.exports.weatherByLoc = async (req, res) => {
    const apiRequest = API.url + API.querySearch + req.params.query;
    const metcast = await getMetcastAsync(apiRequest);
};
