'use strict';

const fetch = require('node-fetch');
const baseUrl = 'https://www.metaweather.com/api/location/';

class Weather {
    constructor(weatherData) {
        let weatherList = [];
        weatherData.consolidated_weather.forEach(o => {
            let theTemp = Math.round(o.the_temp);
            let windSpeed = Math.round(o.wind_speed);
            let date = o.applicable_date;
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

exports.getWeather = (options, cb) => {
    let url = buildUrl(options);
    fetch(url)
        .then(u => u.json())
        .then(weatherData => {
            let woeidUrl = baseUrl + weatherData[0].woeid + '/';

            return fetch(woeidUrl);
        })
        .then(data => data.json())
        .then(
            function (weatherData) {
                cb(new Weather(weatherData));
            }
        );
};

exports.Weather = Weather;
