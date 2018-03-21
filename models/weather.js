'use strict';

module.exports = class DayWeather {
    constructor({ date, temperature, weatherStateAbbr, windSpeed }) {
        this.date = new Date(date);
        this.temperature = temperature;
        this.weatherStateAbbr = weatherStateAbbr;
        this.windSpeed = windSpeed;
    }
};
