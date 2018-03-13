'use strict';

const moment = require('moment');
const querystring = require('querystring');
const got = require('got');

const defaultWoeid = 742676;

class Weather {
    static async getData(query) {
        return requestWoeid(query).then(woeid =>
            got(`https://www.metaweather.com/api/location/${woeid}/`, { json: true })
        )
            .then(response => {
                const body = response.body;
                const today = body.consolidated_weather[0];
                const days = body.consolidated_weather.slice(1).map(day => ({
                    temp: Math.round(day.the_temp),
                    wind: Math.round(day.wind_speed),
                    date: moment(day.applicable_date).format('D MMMM')
                }));

                return {
                    city: body.title,
                    temp: Math.round(today.the_temp),
                    wind: Math.round(today.wind_speed),
                    stateAbbr: today.weather_state_abbr,
                    days
                };
            });
    }
}

function requestWoeid(query) {
    const args = query.query
        ? { query: query.query }
        : { latlong: `${query.lat},${query.lon}` };
    const url = 'https://www.metaweather.com/api/location/search/?' +
        querystring.stringify(args);

    return got(url, { json: true })
        .then(response => response.body[0].woeid)
        .catch(() => defaultWoeid);
}

module.exports = Weather;
