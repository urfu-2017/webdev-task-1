'use strict';

const { formatDate } = require('../middlewares/date');
const { weatherImgLink } = require('../config/weather-api');

class Weather {
    constructor(responseJSON) {
        let weatherInfo = responseJSON.consolidated_weather;

        let weatherAbbr = weatherInfo[0].weather_state_abbr;
        let weatherIconLink = `${weatherImgLink}/${weatherAbbr}.svg`;

        this.city = responseJSON.title;
        this.temp = Math.round(weatherInfo[0].the_temp);
        this.windSpeed = Math.round(weatherInfo[0].wind_speed);
        this.date = weatherInfo[0].applicable_date;
        this.weatherIconLink = weatherIconLink;

        this.futureWeather = [];
        weatherInfo.slice(1).forEach(oldWeather => {
            this.futureWeather.push(
                {
                    temp: Math.round(oldWeather.the_temp),
                    windSpeed: Math.round(oldWeather.wind_speed),
                    date: formatDate(new Date(oldWeather.applicable_date))
                }
            );

        });
    }
}

module.exports = Weather;
