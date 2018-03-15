'use strict';

const gotJson = require('../utils/got-json');

const API_BASE_PATH = require('../config/config.json').weatherApiUrl;

const callApi = async (method, options) => await gotJson(`${API_BASE_PATH}${method}`, options);
const getLocation = async query => (await callApi('/location/search/', { query }))[0];
const getForecast = async woeid => (await callApi(`/location/${woeid}`)).consolidated_weather;

module.exports = async (query) => {
    const { title: city, woeid } = await getLocation(query);
    const forecast = await getForecast(woeid);

    return { city, forecast };
};
