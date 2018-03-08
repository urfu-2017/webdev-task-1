'use strict';

const API_URI = 'https://www.metaweather.com/api/';
const fetch = require('node-fetch');

const MONTHES = [
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

class Weather {
    constructor(city, temp, windSpeed, date, weatherStateAbbr) { // eslint-disable-line max-params
        this.city = city;
        this.temp = Math.round(temp);
        this.windSpeed = Math.round(windSpeed);
        this.date = date.getDate() + ' ' + MONTHES[date.getMonth()];
        this.weatherStateAbbr = weatherStateAbbr;
    }

    static loadLocationByQuery(place) {
        return getJson(`location/search/?query=${place}`)
            .then(res => res[0]);
    }

    static loadLocationByCords(latt, long) {
        return getJson(`location/search/?lattlong=${latt},${long}`)
            .then(res => res[0]);
    }

    static loadConsolidated(location) {
        return getJson(`location/${location.woeid}`)
            .then(res => res.consolidated_weather)
            .then(weathers => weathers.map(weaher => new Weather(
                location.title,
                weaher.the_temp,
                weaher.wind_speed,
                new Date(weaher.applicable_date),
                weaher.weather_state_abbr)));
    }
}

function getJson(requestUriPart) {
    return fetch(API_URI + requestUriPart).then(res => res.json());
}

module.exports = Weather;
