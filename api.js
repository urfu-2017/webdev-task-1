'use strict';

const axios = require('axios');
const { URLS, apiKey } = require('./const');

module.exports = {
    getWoeidByCoordinates: lattlong => axios.get(`${URLS.weather}/search`, {
        params: { lattlong }
    }),
    getWoeidByQuery: query => axios.get(`${URLS.weather}/search/`, { params: { query } }),
    getNewsByCategory: (country, category) => axios.get(URLS.news, {
        params: { country, category, apiKey }
    }),
    getWeatherByWoeid: woeid => axios.get(`${URLS.weather}/${woeid}`)
};
