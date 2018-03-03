'use strict';
const fetch = require('node-fetch');

const baseUrl = 'https://www.metaweather.com/api/location/';

class Weather {
    constructor(city, days) {
        this.city = city;
        this.days = days;
    }

    static async load({ query, lat, lon }) {
        try {
            const queryResponse = await fetch(baseUrl + `query=${query}&lattlong=${lat},${lon}`);
            const location = await queryResponse.json();

            let woeid = null;
            let city = null;

            if (Array.isArray(location) && location[0] && location[0]) {
                woeid = location[0].woeid;
                city = location[0].title;
            }

            const weatherResponse = await fetch(baseUrl + woeid);
            const data = await weatherResponse.json();

            const days = data.map(day => ({
                date: day.applicable_date,
                windSpeed: day.wind_speed,
                state: day.weather_state_name,
                temp: day.the_temp
            }));

            return new Weather(city, days);
        } catch (e) {
            throw new Error('Не удалось загрузить данные о погоде');
        }
    }
}

module.exports = Weather;
