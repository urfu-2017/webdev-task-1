'use strict';

const baseUrl = 'https://www.metaweather.com';

class Weather {
    constructor(weatherData) {
        let weatherList = [];
        weatherData.consolidated_weather.forEach(o => {
            let theTemp = Math.round(o.the_temp);
            let windSpeed = Math.round(o.wind_speed);
            weatherList.push({ theTemp, windSpeed });
        });
        let svgFileName = weatherData.consolidated_weather[0].weather_state_abbr;
        this.title = weatherData.title;
        this.weatherList = weatherList;
        this.currentTemp = this.weatherList[0].theTemp;
        this.currentWind = this.weatherList[0].windSpeed;
        weatherList.shift();
        this.imgUrl = `${baseUrl}/static/img/weather/${svgFileName}.svg`;
    }
}

exports.Weather = Weather;
