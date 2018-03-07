'use strict';

const util = require('util');

const request = require('request');

const apiBaseUrl = 'https://www.metaweather.com/api/location';
const apiUrlWoeidData = `${apiBaseUrl}/search/`;

class WeatherManager {
    static getWeatherData({ query, lat, lon }) {
        let params = {};
        if (!util.isNullOrUndefined(query)) {
            params.query = query;
        } else {
            params.lattlong = `${lat},${lon}`;
        }

        return new Promise ((resolve, reject) => {
            request.get(apiUrlWoeidData, { qs: params }, (err, response, body) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(body);
                }
            });
        });
    }
}

exports.WeatherManager = WeatherManager;
