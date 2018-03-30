'use strict';
const cache = require('lru-cache')({
    max: 100,
    maxAge: 1000 * 60 * 60
});
const WetherModel = require('../models/weather');
const url = require('url');
const linkObj = require('../mocks/config');
const link = url.format(linkObj);
const BASE_LONDON_ID = 44418;
const SEARCH_PATH = 'search/';

exports.getWeather = (query) => {
    let city = query.query;
    let search = `?query=${city}`;
    let XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
    let xhr = new XMLHttpRequest();
    if (cache.get(city)) {
        return cache.get(city);
    }
    if (city) {
        return sendCityRequest(city, xhr, search);
    }
    xhr.open('GET', `${link}${BASE_LONDON_ID}/`, false);
    xhr.send();

    return correctWeather(JSON.parse(xhr.responseText));
};

function sendCityRequest(city, xhr, search) {
    xhr.open('GET', `${link}${SEARCH_PATH}${search}`, false);
    xhr.send();
    if (JSON.parse(xhr.responseText)[0] !== undefined) {
        let cityId = JSON.parse(xhr.responseText)[0].woeid;
        let cityTitle = JSON.parse(xhr.responseText)[0].title;
        if (cache.get(cityTitle)) {
            return cache.get(cityTitle);
        }
        xhr.open('GET', `${link}${cityId}/`, false);
        xhr.send();

        return correctWeather(JSON.parse(xhr.responseText));
    }
}

function correctWeather(data) {
    let city = data.title;
    let weather = data.consolidated_weather.map(element => {
        return new WetherModel (
            {
                city,
                temp: element.the_temp,
                wind: element.wind_speed,
                date: element.applicable_date,
                abbr: element.weather_state_abbr
            }

        );
    });
    if (!cache.get(city)) {
        cache.set(city, weather);
    }

    return weather;
}
