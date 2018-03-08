'use strict';

const request = require('request');

class Weather {
    constructor(query) {
        this.query = query;
    }

    static find(query) {
        return new Promise((resolve, reject) => {
            const weatherUrl = `https://www.metaweather.com/api/location/search/?query=${query}`;
            request.get(weatherUrl, (error, response, body) => {
                if (body) {
                    resolve(JSON.parse(body));
                } else {
                    reject(error);
                }
            });
        }).then((result) => {
            return new Promise((resolve, reject) => {
                let secondUrl = `https://www.metaweather.com/api/location/${result[0].woeid}/`;
                request.get(secondUrl, (error, response, body) => {
                    if (body) {
                        resolve(JSON.parse(body));
                    } else {
                        reject(error);
                    }
                });
            });
        });
    }
}

module.exports = Weather;
