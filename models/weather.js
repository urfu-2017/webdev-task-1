'use strict';

const fetch = require('node-fetch');
const date = require('../helpers/date');

class Weather {
    static async getWeatherData(query, lat, lon) {
        const searchBaseUrl = 'https://www.metaweather.com/api/location/search/?';
        let searchUrl = '';
        if (query) {
            searchUrl = searchBaseUrl + 'query=' + query;
        } else if (lat && lon) {
            searchUrl = searchBaseUrl + 'lattlong=' + lat + ',' + lon;
        } else {
            searchUrl = searchBaseUrl + 'query=London';
        }
        const searchResponse = await fetch(searchUrl);
        const searchJSON = await searchResponse.json();
        const woeid = searchJSON[0].woeid;
        const locationBaseUrl = 'https://www.metaweather.com/api/location/';
        const locationResponse = await fetch(locationBaseUrl + woeid);
        const weatherJSON = await locationResponse.json();

        const weatherData = weatherJSON.consolidated_weather.slice(0, 5).map(element => {
            return {
                abbr: element.weather_state_abbr,
                date: date.parseDate(element.applicable_date),
                temp: Weather.parseTemperature(element.the_temp),
                ws: Weather.parseWindSpeed(element.wind_speed)
            };
        });

        return { city: weatherJSON.title, weatherData: weatherData };
    }

    static parseTemperature(temperature) {
        let temp = parseInt(temperature, 10);
        const celsius = '℃';
        if (temp > 0) {
            temp = '+' + temp;
        }

        return temp + celsius;
    }

    static parseWindSpeed(windSpeed) {
        return Math.round(windSpeed * 0.44704) + 'м/с';
    }
}

module.exports = Weather;
