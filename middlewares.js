'use strict';

const weather = require('./models/weather');

exports.weatherMiddleware = async (req, res, next) => {
    let { query, lat, lon } = req.params;

    if (!(lat && lon) && !query) {
        query = 'Moscow';
    }

    let weatherData = await weather.WeatherManager.getWeatherData({
        query: query,
        lat: lat,
        lon: lon
    });
    let preparedConsolidatedWeather = weatherData.consolidated_weather.map((cw) => {
        return {
            iconState: cw.weather_state_abbr,
            temperature: cw.the_temp.toFixed(0),
            windSpeed: cw.wind_speed.toFixed(0),
            date: cw.applicable_date
        };
    });
    req.weatherData = {
        title: weatherData.title,
        current: preparedConsolidatedWeather[0],
        fiveDays: preparedConsolidatedWeather.slice(1)
    };
    next();
};
