'use strict';

const config = require('../config');

const metaweatherImagesSource = config.metaweatherImagesSource;
const MONTHS = {
    '01': 'Января',
    '02': 'Февраля',
    '03': 'Марта',
    '04': 'Апреля',
    '05': 'Мая',
    '06': 'Июня',
    '07': 'Июля',
    '08': 'Августа',
    '09': 'Сентября',
    '10': 'Октября',
    '11': 'Ноября',
    '12': 'Декабря'
};

class WeatherInfo {
    constructor(temperature, windSpeed, weatherStateAbbr, applicableDate) {
        this.date = this.getDate(applicableDate);
        this.temperature = Math.round(parseFloat(temperature));
        this.windSpeed = Math.round(parseFloat(windSpeed));
        this.urlToImage = `${metaweatherImagesSource}${weatherStateAbbr}.svg`;
    }

    getDate(applicableDate) {
        const date = applicableDate.split('-');
        const month = MONTHS[date[1]];
        const day = (date[2].startsWith('0') ? date[2][1] : date[2]);

        return `${day} ${month}`;
    }
}

module.exports = WeatherInfo;
