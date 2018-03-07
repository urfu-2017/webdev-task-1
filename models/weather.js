'use strict';

const defaultWoeid = 2122265;

const got = require('got');
const querystring = require('querystring');

module.exports = function getWeather(query, lat, lon) {
    return findWoeid(query, lat, lon)
        .then(woeid => got(`https://www.metaweather.com/api/location/${woeid}/`, { json: true }))
        .then(response => {
            const body = response.body;

            return {
                city: body.title,
                today: body.consolidated_weather[0],
                daily: body.consolidated_weather.slice(1)
            };
        });
};

function findWoeid(query, lat, lon) {
    let params;
    if (query) {
        params = { query };
    } else {
        params = { lattlong: `${lat},${lon}` };
    }
    let findUrl = 'https://www.metaweather.com/api/location/search/?' +
        querystring.stringify(params);

    return got(findUrl, { json: true })
        .then(response => response.body[0].woeid)
        .catch(() => defaultWoeid);
}
