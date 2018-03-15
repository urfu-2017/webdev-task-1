'use strict';

const moment = require('moment');
const weatherFetch = require('../utils/weather-fecth');

module.exports = class Weather {
    /* eslint-disable camelcase */
    constructor(city, forecast) {
        this.currentWeather = forecast[0];
        this.futureWeather = forecast.slice(1, 6);
        this.city = city;
    }
    /* eslint-enable */

    static async getWeather(query) {
        let { city, forecast } = await weatherFetch(query);
        forecast = forecast
            .map(x => ({
                temperature: Math.round(x.the_temp),
                windSpeed: Math.round(x.wind_speed),
                weatherStatName: x.weather_state_name,
                weatherStateAbbr: x.weather_state_abbr,
                date: x.applicable_date,
                formattedDate: moment(x.applicable_date).format('D MMM')
            }));

        return new Weather(city, forecast);
    }
};
