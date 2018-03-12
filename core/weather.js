'use strict';

const MetaWeather = require('metaweather');
const WeatherInfo = require('../models/WeatherInfo');
const config = require('../config');

const mw = new MetaWeather();

exports.getWeatherInfoAsync = async (req) => {
    let locations = [];

    if (req.query && req.query.lat && req.query.lon) {
        const lat = parseFloat(req.query.lat);
        const lon = parseFloat(req.query.lon);
        locations = await mw.search().latLon({ lat, lon });
    } else if (req.query && req.query.query) {
        locations = await mw.search().query(req.query.query);
    } else {
        locations = await mw.search().query(config.defaultCity);
    }

    const woeid = locations.body[0].woeid;
    const result = await mw.location(woeid).then(r => r.body);
    const weather = result.consolidated_weather.map(o =>
        new WeatherInfo(o.the_temp, o.wind_speed, o.weather_state_abbr, o.applicable_date));

    return { cityName: result.title, weatherToday: weather.shift(), forecast: weather };
};
