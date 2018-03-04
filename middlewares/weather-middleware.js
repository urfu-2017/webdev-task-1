/* eslint-disable */

'use strict';

const request = require('request');
const baseUrl = 'https://www.metaweather.com/api/';
const defaultCity = 'Moscow';

const getLocationId = ({ query, lat, lon }) => new Promise((resolve, reject) => {
    let url = null;

    if (query) {
        url = baseUrl + `location/search/?query=${query}`;
    } else if (lat && !Number.isNaN(lat) && lon && !Number.isNaN(lon)) {
        url = baseUrl + `location/search/?lattlong=${lat},${lon}`
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

module.exports = (req, res, next) => {
    res.locals = res.locals || {};

    if (req.query) {
        const { query, lat, lon } = req.query;
        getLocationId({ query, lat, lon })
            .then(id => getWeather(id))
            .then(data => {
                console.info(data);
            })
            .catch(error => {
                console.error(error);
            });
    }
    next();
};