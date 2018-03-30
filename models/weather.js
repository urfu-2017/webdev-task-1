'use strict';
const months = [
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

class weather {
    constructor({ city, temp, wind, date, abbr }) {
        this.city = city;
        this.temp = temp.toFixed(1);
        this.wind = wind.toFixed(1);
        this.date = getRusTime(date);
        this.abbr = abbr;
    }
}


module.exports = weather;

function getRusTime(time) {
    var timeObject = new Date(time);

    return `${timeObject.getDate()} ${months[timeObject.getMonth()]}`;
}
