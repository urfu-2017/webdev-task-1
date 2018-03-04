'use strict';

const gotJson = require('../utils/got-json');

const API_BASE_PATH = 'https://www.metaweather.com/api/';
const DEFAULT_QUERY_PARAMS = { query: 'london' };

const callApi = async (method, options) => await gotJson(`${API_BASE_PATH}${method}`, options);
const getWoeid = async query => (await callApi('/location/search/', { query }))[0].woeid;
const getForecast = async woeid => (await callApi(`/location/${woeid}`)).consolidated_weather;

exports.forecast = async (req, res) => {
    const query = getQueryParams(req.query);
    const woeid = await getWoeid(query);
    const forecast = await getForecast(woeid);

    res.json(forecast);
};

function getQueryParams(requestQuery) {
    if (requestQuery.query) {
        return { query: requestQuery.query };
    }

    if (requestQuery.lat && requestQuery.lon) {
        return { lattlong: `${requestQuery.lat},${requestQuery.lon}` };
    }

    return DEFAULT_QUERY_PARAMS;
}
