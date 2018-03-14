'use strict';

const fetch = require('node-fetch');

const config = require('../config/common');

class Weather {
    static getWeather(params) {

        let search = '';

        if (params.query) {
            search = `search/?query=${params.query}`;
        } else if (params.lat && params.lon) {
            search = `search/?lattlong=${params.lat},${params.lon}`;
        } else {
            return fetch(config.apiLink + config.defaultCityWoeid)
                .then(response => response.json())
                .then(fields => {

                    return parseJSON(fields);
                });
        }
        return fetch(config.apiLink + search)
            .then(response => response.json())
            .then(fields => fields[0].woeid)
            .then(woeid => fetch(config.apiLink + woeid))
            .then(response => response.json())
            .then(fields => {

                return parseJSON(fields);
            });

    }
}

function parseJSON(parseDate) {
    let weatherData = {};
    let fields = parseDate
        .consolidated_weather
        .map((weather) => {
            return {
                weatherStateName: weather.weather_state_name,
                date: new Date (weather.applicable_date)
                    .toLocaleDateString('en-US', { month: 'long', day: 'numeric' }),
                windSpeed: weather.wind_speed.toFixed(1),
                temp: weather.the_temp.toFixed(1),
                weatherStateAbbr: weather.weather_state_abbr
            };
        });

    weatherData.city = parseDate.title;
    weatherData.today = fields[0];
    weatherData.weatherOnDays = fields.slice(1);

    return weatherData;
}

module.exports = Weather;
