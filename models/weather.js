'use strict';

const BASE_LINK = 'https://www.metaweather.com';

const MONTHS = [
    'Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня',
    'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря'
];

class Weather {
    constructor(responseJSON) {
        let weatherInfo = responseJSON.consolidated_weather;

        let weatherAbbr = weatherInfo[0].weather_state_abbr;
        let weatherIconLink = `${BASE_LINK}/static/img/weather/${weatherAbbr}.svg`;

        this.city = responseJSON.title;
        this.temp = Math.round(weatherInfo[0].the_temp);
        this.windSpeed = Math.round(weatherInfo[0].wind_speed);
        this.date = weatherInfo[0].applicable_date;
        this.weatherIconLink = weatherIconLink;

        this.futureWeather = [];
        weatherInfo.slice(1).forEach(oldWeather => {
            let dayNumber = new Date(oldWeather.applicable_date).getDate();
            let monthNumber = new Date(oldWeather.applicable_date).getMonth();
            let date = `${dayNumber} ${MONTHS[monthNumber]}`;
            this.futureWeather.push(
                {
                    temp: Math.round(oldWeather.the_temp),
                    windSpeed: Math.round(oldWeather.wind_speed),
                    date
                }
            );

        });
    }

    static getBaseLink() {
        return BASE_LINK;
    }

}

module.exports = Weather;
