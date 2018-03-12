'use strict';

const fetch = require('node-fetch');
const baseUrl = 'https://www.metaweather.com/api/location/';

class Weather {
    constructor(weatherData) {
        let weatherList = [];
        weatherData.consolidated_weather.forEach(elem => {
            let theTemp = Math.round(elem.the_temp);
            let windSpeed = Math.round(elem.wind_speed);
            let date = elem.applicable_date;
            weatherList.push({ theTemp, windSpeed, date });
        });
        let svgFileName = weatherData.consolidated_weather[0].weather_state_abbr;
        this.title = weatherData.title;
        this.weatherList = weatherList;
        this.currentTemp = this.weatherList[0].theTemp;
        this.currentWind = this.weatherList[0].windSpeed;
        weatherList.shift();
        this.imgUrl = `https://www.metaweather.com/static/img/weather/${svgFileName}.svg`;
    }
}

function buildUrl(options) {
    if (options.lat && options.lon) {
        let lattlong = `${options.lat},${options.lon}`;

        return `${baseUrl}search/?lattlong=${lattlong}`;
    } else if (options.query) {
        return `${baseUrl}search/?query=${options.query}`;
    }

    return `${baseUrl}search/?query=london`;
}

async function getWeather(options) {
    const url = buildUrl(options);
    const u = await fetch(url);
    const weatherData = await u.json();
    const woeidUrl = `${baseUrl}${weatherData[0].woeid}/`;
    const data = await fetch(woeidUrl);
    const weatherData1 = await data.json();

    return new Weather(weatherData1);
}

module.exports = { Weather, getWeather };
