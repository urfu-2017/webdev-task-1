'use strict';
const MetaWeather = require('metaweather');
const mw = new MetaWeather();
const Location = require('./location');

function iconSrc(state) {
    return `https://www.metaweather.com/static/img/weather/${state}.svg`;
}

/* eslint-disable camelcase */
function toForecasts({ the_temp, weather_state_abbr, wind_speed, applicable_date }) {
    return ({
        state: weather_state_abbr,
        temperature: the_temp,
        windSpeed: Math.round(wind_speed),
        date: applicable_date,
        iconSrc: iconSrc(weather_state_abbr)
    });
}

/* eslint-enable camelcase */

function weatherInfoToViewModel(weatherInfo) {
    const forecasts = weatherInfo.consolidated_weather.map(toForecasts);

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
