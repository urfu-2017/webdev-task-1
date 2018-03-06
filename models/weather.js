'use strict';

const fetch = require('node-fetch');

class Weather {
    static async getWeatherJSON(req) {
        const query = req.query.query;
        const lat = req.query.lat;
        const lon = req.query.lon;
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
        const searchJson = await searchResponse.json();
        const locationBaseUrl = 'https://www.metaweather.com/api/location/';
        const locationUrl = locationBaseUrl + searchJson[0].woeid;
        const locationResponse = await fetch(locationUrl);

        return await locationResponse.json();
    }

    static getWeatherData(weatherJSON) {
        const weatherData = weatherJSON.consolidated_weather.map(element => {
            return {
                abbr: element.weather_state_abbr,
                date: Weather.parseDate(element.applicable_date),
                temp: Weather.parseTemperature(element.the_temp),
                ws: Weather.parseWindSpeed(element.wind_speed)
            };
        });

        return { city: weatherJSON.title, weatherData: weatherData };
    }

    static parseDate(date) {
        const months = [
            'января',
            'февраля',
            'марта',
            'апреля',
            'мая',
            'июня',
            'июля',
            'августа',
            'сентября',
            'октября',
            'ноября',
            'декабря'
        ];
        const [, month, day] = date.split('-');
        const monthName = months[parseInt(month, 10) - 1];
        const dayNumber = parseInt(day, 10);

        return dayNumber + ' ' + monthName;
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
