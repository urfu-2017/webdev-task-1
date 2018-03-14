'use strict';

const fetch = require('node-fetch');
const config = require('../config');
const baseUrl = config.weather;

module.exports = class Weather {
    static async getWeather(options) {
        const url = this.buildUrl(options);
        let data = await fetch(url);
        let weatherData = await data.json();
        const woeidUrl = `${baseUrl}${weatherData[0].woeid}/`;
        data = await fetch(woeidUrl);
        weatherData = await data.json();

        return this.buildWeatherData(weatherData);
    }
    static buildUrl(options) {
        if (options.lat && options.lon) {
            const lattlong = `${options.lat},${options.lon}`;

            return `${baseUrl}search/?lattlong=${lattlong}`;
        } else if (options.query) {
            return `${baseUrl}search/?query=${options.query}`;
        }

        return `${baseUrl}search/?query=london`;
    }

    static buildWeatherData(weatherData) {
        let weatherList = [];
        weatherData.consolidated_weather.forEach(elem => {
            let theTemp = Math.round(elem.the_temp);
            let windSpeed = Math.round(elem.wind_speed);
            let date = elem.applicable_date;
            weatherList.push({ theTemp, windSpeed, date });
        });
        const svgFileName = weatherData.consolidated_weather[0].weather_state_abbr;
        const data = {
            title: weatherData.title,
            weatherList: weatherList,
            currentTemp: weatherList[0].theTemp,
            currentWind: weatherList[0].windSpeed,
            imgUrl: `${config.weatherImg}${svgFileName}.svg`
        };
        data.weatherList.shift(0);

        return data;
    }
};
