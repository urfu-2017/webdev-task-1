'use strict';

const request = require('request');
const querystring = require('querystring');

const URL = 'https://www.metaweather.com/api/location/';

function weatherSearchHelper(query) {
    let resultUrl = URL;
    if (query) {
        resultUrl += `search/?${query}`;
    }
    const options = {
        method: 'GET',
        url: resultUrl,
        json: true
    };

    return createRequestPromise(options);
}

function weatherHelper(woeid) {
    let resultUrl = URL + woeid + '/';
    const options = {
        method: 'GET',
        url: resultUrl,
        json: true
    };

    return createRequestPromise(options);
}

function createRequestPromise(options) {
    return new Promise((resolve) => {
        request(options, function (err, res, body) {
            if (err) {
                return resolve(err);
            }

            return resolve(body);
        });
    });
}


function defaultQuery(queryCountry, lat, lon) {
    if (queryCountry) {
        return queryCountry;
    }
    if (!queryCountry && !lat && !lon) {
        return 'moscow';
    }
}

class Weather {
    constructor({ temp, date, windSpeed, stateName }) {
        this.temp = temp;
        this.date = date;
        this.windSpeed = windSpeed;
        this.stateName = stateName;
    }

    static async findAll(queryCountry, lat, lon) {
        queryCountry = defaultQuery(queryCountry, lat, lon);
        let storage = [];
        let query;
        if (queryCountry) {
            query = querystring.stringify({ 'query': queryCountry });
        } else {
            query = querystring.stringify({ 'lattlong': `${lat},${lon}` });
        }
        let woeid = (await weatherSearchHelper(query))[0].woeid;
        let weathers = (await weatherHelper(woeid)).consolidated_weather;
        for (const weather of weathers) {
            weather.temp = Math.round(weather.the_temp);
            weather.date = weather.applicable_date;
            weather.windSpeed = Math.round(weather.wind_speed);
            weather.stateName = weather.weather_state_name;
            storage.push(new Weather(weather));
        }

        return Promise.resolve(storage);
    }
}

module.exports = Weather;
