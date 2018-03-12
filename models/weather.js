'use strict';
const querystring = require('querystring');
const fetch = require('node-fetch');
const config = require('../config');

class Weather {
    constructor(city, days) {
        this.city = city;
        this.days = days;
    }

    static async load({ query, lat, lon }) {
        try {
            const urlQuery = querystring.stringify({ query, lat, lon });
            const queryResponse = await fetch(`${config.weatherApiUrl}search?${urlQuery}`);
            const location = await queryResponse.json();

            let woeid = location[0].woeid;
            let city = location[0].title;

            const weatherResponse = await fetch(config.weatherApiUrl + woeid);
            const data = await weatherResponse.json();
            const days = data.consolidated_weather.map(day => ({
                date: new Date(day.applicable_date),
                windSpeed: day.wind_speed,
                state: day.weather_state_name,
                temp: day.the_temp
            }));

            return new Weather(city, days);
        } catch (e) {
            throw new Error('Не удалось загрузить данные о погоде');
        }
    }
}

module.exports = Weather;
