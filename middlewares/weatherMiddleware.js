'use strict';

const fetch = require('node-fetch');
const WeatherHelper = require('../helpers/weatherHelper');
const config = require('../public/settings/config');

exports.getWeatherInfo = (req, res, next) => {
    let queryForLocation = WeatherHelper.getQueryForLocation(res.locals.queryParams);
    fetch(`${config.weatherApiUrl}search/${queryForLocation}`)
        .then(data => data.json())
        .then(json => {
            res.locals.cityForWeather = json[0].title;

            return fetch(`${config.weatherApiUrl}${json[0].woeid}/`);
        })
        .then(data => data.json())
        .then(json=> {
            let days = WeatherHelper
                .getWeatherInfoForFiveDays(json.consolidated_weather);
            res.locals.weatherInfoForFiveDays = days;
            res.locals.firstDay = days[0];
            next();
        })
        .catch(err => next(err));
};
