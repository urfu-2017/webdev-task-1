'use strict';
const moment = require('moment');
const fetch = require('node-fetch');
class Day {
    constructor(day) {
        this.temperature = Math.round(day.the_temp);
        this.wind = Math.round(day.wind_speed);
        this.date = moment(day.applicable_date).format('D MMMM');
    }
}

class WeatherBlock {
    constructor(weather) {
        this.city = weather.title;
        let weatherStateAbbr = weather.consolidated_weather[0].weather_state_abbr;
        this.stateUrl = `https://www.metaweather.com/static/img/weather/${weatherStateAbbr}.svg`;
        this.temperature = Math.round(weather.consolidated_weather[0].the_temp);
        this.wind = Math.round(weather.consolidated_weather[0].wind_speed);
        this.date = moment(weather.consolidated_weather.applicable_date).format('D MMMM');
        this.nextDays = weather.consolidated_weather.map((el) => new Day(el));
    }
}

class Weather {
    static getWeather(myLocation) {
        return fetch(`https://www.metaweather.com/api/location/search/?query=${myLocation}`)
            .then(response => response.text())
            .then(text => JSON.parse(text))
            .then(el => el[0].woeid)
            .then(woeid => fetch(`https://www.metaweather.com/api/location/${woeid}/`))
            .then(response => response.text())
            .then(text => JSON.parse(text))
            .then(data => new WeatherBlock(data));
    }
}

module.exports = Weather;

