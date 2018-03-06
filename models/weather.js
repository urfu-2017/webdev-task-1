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
            let url = null;

            if (query) {
                url = `search?query=${query}`;
            } else if (lat && lon) {
                url = `search?lattlong=${lat},${lon}`;
            }

            const queryResponse = await fetch(baseUrl + url);
            const location = await queryResponse.json();

            let woeid = location[0].woeid;
            let city = location[0].title;

            const weatherResponse = await fetch(baseUrl + woeid);
            const data = await weatherResponse.json();
            const days = data.consolidated_weather.map(day => ({
                date: new Date(day.applicable_date),
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
