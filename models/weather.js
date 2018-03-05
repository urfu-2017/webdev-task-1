'use strict';

const moment = require('moment');

const { reject, promiseError } = require('../utils');
const { ERRORS } = require('../const');
const api = require('../api');

module.exports = class Weather {
    static find({ query, lat, lon }) {
        if (query) {
            return api.getWoeidByQuery(query)
                .then(({ data }) => api.getWeatherByWoeid(data[0].woeid), reject)
                .then(Weather.getWeatherBySearchData, e => e);
        }
        if (lat && lon) {
            return api.getWoeidByCoordinates(`${lat},${lon}`)
                .then(({ data }) => api.getWeatherByWoeid(data[0].woeid), reject)
                .then(Weather.getWeatherBySearchData, e => e);
        }

        return promiseError(ERRORS.CANT_LOCATE);
    }

    static getWeatherBySearchData({ data }) {
        try {
            return {
                city: data.title,
                forecast: data.consolidated_weather.map(i => ({
                    temp: Math.round(i.the_temp),
                    wind: Math.round(i.wind_speed),
                    date: moment(i.applicable_date).format('DD.MM')
                })),
                imgAbbr: data.consolidated_weather[0].weather_state_abbr
            };
        } catch (e) {
            return { error: ERRORS.CANT_LOCATE };
        }

    }
};
