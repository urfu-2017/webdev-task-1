'use strict';

const got = require('got');
const months = require('../mocks/months');

const locationUrl = process.env.locationUrl;
const locationSearchUrl = process.env.locationSearchUrl;
const weatherImageUrl = process.env.weatherImageUrl;

exports.getConsolidatedWeather = () => {
    return getWeather()
        .then(data => {
            return got(`${locationUrl}${data.woeid}/`, { json: true });
        })
        .then(data => {
            let consolidatedWeather = getWeatherData(data.body.consolidated_weather);
            let stateAbrr = consolidatedWeather[0].weatherStateAbbr;

            return {
                consolidatedWeather,
                title: data.body.title,
                url: `${weatherImageUrl}${stateAbrr}.svg`
            };
        });
};

function getWeatherData(weatherData) {
    return weatherData.slice(0, 5)
        .map(data => {
            let date = new Date(data.applicable_date);
            let day = date.getDate();
            let month = months[date.getMonth()];

            return {
                temp: Math.floor(data.the_temp),
                windSpeed: Math.floor(data.wind_speed),
                date: `${day} ${month}`,
                weatherState: data.weather_state_name,
                weatherStateAbbr: data.weather_state_abbr
            };
        });
}

function getWeather() {
    return got(locationSearchUrl, { json: true })
        .then(data => {
            return {
                woeid: data.body[0].woeid
            };
        })
        .catch(err => console.info(err));
}
