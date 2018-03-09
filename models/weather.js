'use strict';

const fetch = require('node-fetch');

const apiLink = 'https://www.metaweather.com/api/location/';

class Weather {
    static getWeather(params) {

        let search = 'search/?';

        if (params.query) {
            search += 'query=' + params.query;
        } else if (params.lat && params.lon) {
            search += 'lattlong=' + params.lat + ',' + params.lon;
        } else {
            return fetch(apiLink + '2487956/')
                .then(response => response.json())
                .then(fields => {

                    return parseJSON(fields);
                });
        }

        return fetch(apiLink + search)
            .then(response => response.json())
            .then(fields => fields[0].woeid)
            .then(woeid => fetch(apiLink + woeid))
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
                weather_state_name: weather.weather_state_name,
                applicable_date: new Date (weather.applicable_date)
                    .toLocaleDateString('en-US', { month: 'long', day: 'numeric' }),
                wind_speed: weather.wind_speed.toFixed(1),
                the_temp: weather.the_temp.toFixed(1),
                weather_state_abbr: weather.weather_state_abbr
            };
        });

    weatherData.city = parseDate.title;
    weatherData.today = fields[0];
    weatherData.weatherOnDays = fields.slice(1);

    return weatherData;
}

module.exports = Weather;
