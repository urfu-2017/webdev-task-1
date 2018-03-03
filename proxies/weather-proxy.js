'use strict';

const got = require('got');

const WeatherInfo = require('../models/weather-info');

const metaweatherApiUrl = 'https://www.metaweather.com/api/';
const queryUrl = 'location/search/?query=';
const lattlongUrl = 'location/search/?lattlong=';
const locationUrl = 'location/';

const queryInternal = url => got(metaweatherApiUrl + url, { json: true });

const apiQuery = url => queryInternal(url)
    .then(resp => {
        return {
            woeid: resp.body[0].woeid,
            cityName: resp.body[0].title
        };
    })
    .then(({ woeid, cityName }) => queryInternal(locationUrl + woeid)
        .then(resp => resp.body.consolidated_weather
            .map(weatherInfo => new WeatherInfo(
                {
                    cityName,
                    date: weatherInfo.applicable_date,
                    weatherStateAbbr: weatherInfo.weather_state_abbr,
                    temperature: weatherInfo.the_temp,
                    windSpeed: weatherInfo.wind_speed
                })))
        .then(weatherInfos => {
            return {
                today: weatherInfos[0],
                nextDays: weatherInfos.slice(1)
            };
        }));

exports.query = query => {
    return apiQuery(queryUrl + query);
};

exports.lattlong = lattlong => {
    return apiQuery(lattlongUrl + lattlong);
};
