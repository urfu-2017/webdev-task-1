'use strict';

const querystring = require('querystring');
const got = require('got');

const defaultWoeid = 742676;

class Weather {
    static getWeather(query) {
        return requestWoeid(query).then(woeid =>
            got(`https://www.metaweather.com/api/location/${woeid}/`, { json: true })
        )
            .then(response => {
                const body = response.body;

                return {
                    city: body.title,
                    today: body.consolidated_weather[0]
                };
            });
    }
}

function getArgs(query) {
    if (query.query) {
        return { query: query.query };
    }

    return { lattlong: `${query.lat},${query.lon}` };
}

function requestWoeid(query) {
    const args = getArgs(query);
    const url = 'https://www.metaweather.com/api/location/search/?' +
        querystring.stringify(args);

    return got(url, { json: true })
        .then(response => response.body[0].woeid)
        .catch(() => defaultWoeid);
}

module.exports = Weather;
