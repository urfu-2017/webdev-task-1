'use strict';
const MetaWeather = require('metaweather');
const mw = new MetaWeather();
const { formatDate, formatTemperature } = require('../helpers/formatters');
const Location = require('./location');

function iconSrc(state) {
    return `https://www.metaweather.com/static/img/weather/${state}.svg`;
}

function weatherInfoToViewModel(weatherInfo) {
    const forecasts = weatherInfo.consolidated_weather.map(
        // eslint-disable-next-line camelcase
        ({ the_temp, weather_state_abbr, wind_speed, applicable_date }) =>
            ({
                temperature: formatTemperature(the_temp),
                windSpeed: Math.round(wind_speed),
                date: formatDate(applicable_date, 'D MMMM'),
                iconSrc: iconSrc(weather_state_abbr)
            }));

    return {
        city: weatherInfo.title,
        todayForecast: forecasts[0],
        forecasts
    };
}

class Weather {
    static getAsync(query) {
        return Location.getAsync(query)
            .then(locationRequest => locationRequest.body[0])
            .then(location => mw.location(location.woeid))
            .then(weatherRequest => weatherRequest.body)
            .then(weatherInfoToViewModel);
    }

}

module.exports = Weather;
