'use strict';

const config = require('../config/default');
const fetch = require('node-fetch');

const API_URI = 'https://www.metaweather.com/api/';
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
    constructor({ city, temp, windSpeed, date, weatherStateAbbr }) {
        this.city = city;
        this.temp = temp;
        this.windSpeed = windSpeed;
        this.date = date;
        this.weatherStateAbbr = weatherStateAbbr;
    }

    static async loadConsolidated(request) {
        const locations = await loadLocations(request);
        if (!locations) {
            return this.createDefaultConsolidated();
        }

        const nearestLocation = locations[0];
        const weather = await getJson(`location/${nearestLocation.woeid}`);

        if (!weather) {
            return this.createDefaultConsolidated();
        }

        return weather.consolidated_weather
            .map(weaher => {
                const date = new Date(weaher.applicable_date);

                return new Weather({
                    city: nearestLocation.title,
                    temp: Math.round(weaher.the_temp),
                    windSpeed: Math.round(weaher.wind_speed),
                    date: `${date.getDate()} ${MONTHES[date.getMonth()]}`,
                    weatherStateAbbr: weaher.weather_state_abbr
                });
            });
    }

    static createDefaultConsolidated() {
        return [1, 2, 3, 4, 5, 6].map(() => Object.assign({}, config.defaultWeather));
    }
}

async function loadLocations(request) {
    if (request.query) {
        return await getJson(`location/search/?query=${request.query}`);
    } else if (request.lat && request.lon) {
        return await getJson(`location/search/?lattlong=${request.lat},${request.lon}`);
    }
}

async function getJson(requestUriPart) {
    return (await fetch(API_URI + requestUriPart)).json();
}

module.exports = Weather;
