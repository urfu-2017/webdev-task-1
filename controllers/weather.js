'use strict';

const fetch = require('node-fetch');
const querystring = require('querystring');

const WeatherInfo = require('../models/weatherInfo');

const sourcePrefix = 'https://www.metaweather.com/api/location/';

exports.getCurrentWeather = async (req, res, next) => {
    if (req.query.lat === undefined || req.query.lat === undefined) {
        next();

        return;
    }

    const locationId = await getLocationIdAsync(req.query.lat, req.query.lon);
    const response = await fetch(`${sourcePrefix}${locationId}`);
    const jsonWeatherInfo = await response.json();
    req.weatherInfo = new WeatherInfo(jsonWeatherInfo);
    next();
};

async function getLocationIdAsync(lat, lon) {
    const requestParams = querystring.stringify({ 'lattlong': `${lat},${lon}` });
    const response = await fetch(`${sourcePrefix}search/?${requestParams}`);
    const locationInfo = await response.json();

    return locationInfo[0].woeid;
}
