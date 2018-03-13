'use strict';

const numberMonth = require('./numberMonth');

function getTempWithSign(temperature) {
    if (temperature < 0) {
        return '-' + temperature;
    } else if (temperature > 0) {
        return '+' + temperature;
    }

    return ' ' + temperature;
}

function getNextDay(oneDay) {
    const today = new Date(oneDay.applicable_date);

    return {
        temperature: getTempWithSign(Math.round(oneDay.the_temp)),
        wind: Math.round(oneDay.wind_speed),
        day: today.getUTCDate(),
        month: numberMonth(today.getUTCMonth())
    };
}

class Widget {
    constructor(weather) {
        this.city = weather.title;

        const arrNextDays = weather.consolidated_weather;
        const weatherToday = arrNextDays.shift();

        this.temperature = getTempWithSign(Math.round(weatherToday.the_temp));
        this.wind = Math.round(weatherToday.wind_speed);

        const stateAbbr = weatherToday.weather_state_abbr;
        this.stateUrl = `https://www.metaweather.com/static/img/weather/${stateAbbr}.svg`;

        const today = new Date(weather.time);
        this.day = today.getUTCDate();
        this.month = numberMonth(today.getUTCMonth());

        this.next5Days = arrNextDays.map(item => getNextDay(item));

    }
}

module.exports = Widget;


