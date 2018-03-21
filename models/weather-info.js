'use strict';

const monthNames = [
    'Января',
    'Февраля',
    'Марта',
    'Апреля',
    'Мая',
    'Июня',
    'Июля',
    'Августа',
    'Сентября',
    'Октября',
    'Ноября',
    'Декабря'
];

function getDateString(date) {
    return `${date.getDate()} ${monthNames[date.getMonth()]}`;
}


class WeatherInfo {
    constructor({ cityName, date, weatherStateAbbr, temperature, windSpeed }) {
        this.cityName = cityName;
        this.date = getDateString(new Date(date));
        this.weatherStateAbbr = weatherStateAbbr;
        this.temperature = Math.round(temperature);
        this.windSpeed = Math.round(windSpeed, 1);
    }
}

module.exports = WeatherInfo;
