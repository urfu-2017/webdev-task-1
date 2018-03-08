'use strict'

const METAWEATHER_SOURCE = 'https://www.metaweather.com/static/img/weather/';
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
}


class WeatherInfo {
    constructor(the_temp, wind_speed, weather_state_abbr, applicable_date) {
        this.date = this.getDate(applicable_date)
        this.temperature = Math.round(parseFloat(the_temp));
        this.windSpeed = Math.round(parseFloat(wind_speed));
        this.urlToImage = `${METAWEATHER_SOURCE}${weather_state_abbr}.svg`;
    }

    getDate(applicable_date) {
        const date = applicable_date.split('-');
        const month = MONTHS[date[1]];
        const day = (date[2].startsWith('0') ? date[2][1] : date[2]);

        return `${day} ${month}`;
    }
}

module.exports = WeatherInfo;