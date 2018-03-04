'use strict';

const axios = require('axios');
const { URLS, apiKey, ERRORS } = require('./const');
const { promiseError, getWeatherBySearchData, getNewsBySearchData } = require('./utils');

module.exports = {
    getWeatherByCoordinates: lattlong => axios.get(`${URLS.weather}search`, {
        params: { lattlong }
    }).then(getWeatherBySearchData)
        .catch(() => promiseError(ERRORS.CANT_LOCATE)),
    getWeatherByQuery: query => axios.get(`${URLS.weather}search`, { params: { query } })
        .then(getWeatherBySearchData)
        .catch(() => promiseError(ERRORS.CANT_LOCATE)),
    getNewsByCategory: (country, category) => axios.get(URLS.news, {
        params: { country, category, apiKey }
    }).then(getNewsBySearchData)
        .catch(() => promiseError(ERRORS.CANT_LOCATE))
};
