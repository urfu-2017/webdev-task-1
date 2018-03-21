'use strict';
import moment from 'moment';
import fetch from 'node-fetch';
import config from '../config/config';
import url from 'url';

function nextDay(day) {
    return {
        temperature: Math.round(day.the_temp),
        wind: Math.round(day.wind_speed),
        date: moment(day.applicable_date).format('D MMMM')
    }
}

class WeatherBlock {
    constructor(weather) {
        this.city = weather.title;
        let weatherStateAbbr = weather.consolidated_weather[0].weather_state_abbr;
        this.stateUrl = url.format(config.urlAbbr) + `${weatherStateAbbr}.svg`;
        this.temperature = Math.round(weather.consolidated_weather[0].the_temp);
        this.wind = Math.round(weather.consolidated_weather[0].wind_speed);
        this.date = moment(weather.consolidated_weather.applicable_date).format('D MMMM');
        this.nextDays = weather.consolidated_weather.map((el) => nextDay(el));
    }
}

class Weather {
    static getWeather(myLocation) {
        return fetch(url.format(config.urlLocation) + `?query=${myLocation}`)
            .then(response => response.json())
            .then(el => el[0].woeid)
            .then(woeid => fetch(url.format(config.urlWoeid) + `${woeid}/`))
            .then(response => response.json())
            .then(data => new WeatherBlock(data));
    }
}

module.exports = Weather;

