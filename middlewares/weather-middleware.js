'use strict';

const formatDate = require('./date-format');

const request = require('request');
const baseUrl = 'https://www.metaweather.com/api/';
const defaultCity = 'Moscow';

const getLocationId = ({ query, lat, lon }) => new Promise((resolve, reject) => {
    let url = null;

    if (query) {
        url = baseUrl + `location/search/?query=${query}`;
    } else if (lat && !Number.isNaN(lat) && lon && !Number.isNaN(lon)) {
        url = baseUrl + `location/search/?lattlong=${lat},${lon}`;
    } else {
        url = baseUrl + `location/search/?query=${defaultCity}`;
    }

    request(url, (err, response, body) => {
        if (err) {
            reject(new Error('Request failed'));

            return;
        }

        body = JSON.parse(body);

        if (Array.isArray(body) && body[0] && body[0].woeid) {
            resolve(body[0].woeid);

            return;
        }
        reject(new Error('Response no data'));
    });
});

const getWeather = placeId => new Promise((resolve, reject) => {
    request(baseUrl + `/location/${placeId}`, (err, response, body) => {
        if (err) {
            reject(new Error('Request failed'));

            return;
        }
        resolve(JSON.parse(body));
    });
});

const getInfo = (oldArray, field, isDate) => {
    const elements = [];
    oldArray.forEach(element => {
        if (isDate) {
            elements.push(formatDate(element[field]));
        } else {
            elements.push(parseInt(element[field]));
        }
    });

    return elements.splice(1, 5);
};

module.exports = (req, res, next) => {
    if (req.query) {
        const { query, lat, lon } = req.query;
        getLocationId({ query, lat, lon })
            .then(id => getWeather(id))
            .then(data => {
                res.locals.city = data.title;
                res.locals.image = data.consolidated_weather[0].weather_state_abbr;
                res.locals.tempToday = parseInt(data.consolidated_weather[0].the_temp);
                res.locals.windToday = parseInt(data.consolidated_weather[0].wind_speed);
                res.locals.dates = getInfo(data.consolidated_weather, 'applicable_date', true);
                res.locals.temps = getInfo(data.consolidated_weather, 'the_temp', false);
                res.locals.winds = getInfo(data.consolidated_weather, 'wind_speed', false);
                next();
            })
            .catch(error => {
                console.error(error);
                next();
            });
    }
};
