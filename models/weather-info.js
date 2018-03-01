'use strict';

class WeatherInfo {
    constructor({ cityName, date, weatherStateAbbr, temperature, windSpeed }) {
        this.cityName = cityName;
        this.date = date;
        this.weatherStateAbbr = weatherStateAbbr;
        this.temperature = temperature;
        this.windSpeed = windSpeed;
    }
}

module.exports = WeatherInfo;
