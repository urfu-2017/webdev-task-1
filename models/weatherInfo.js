'use strict';

const dateFormat = require('dateformat');

/* eslint-disable */

class WeatherInfo {
    constructor({ title, consolidated_weather }) {
        const consolidatedWeather = consolidated_weather.map(formatWeatherInfo);

        const currentStateName = consolidatedWeather[0].weather_state_abbr;
        this.currentWeatherInfo = consolidatedWeather[0];
        this.nextDaysWeather = consolidatedWeather.slice(1);
        this.urlForIco = `https://www.metaweather.com/static/img/weather/${currentStateName}.svg`;
        this.locationName = title;
    }
}

function formatWeatherInfo(info) {
    info.applicable_date = dateFormat(info.applicable_date, 'd mmmm');
    info.the_temp = info.the_temp.toFixed(2);
    info.wind_speed = info.wind_speed.toFixed(2);

    return info;
}

module.exports = WeatherInfo;
