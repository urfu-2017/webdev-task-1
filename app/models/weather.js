'use strict';

var request = require('request');

class Weather {
    constructor({ query }) {
        this.query = query;
    }
    static prognoz(query) {
        let urlToWoeid = `https://www.metaweather.com/api/location/search/?query=${query}`;

        return new Promise((resolve, reject) => {
            request.get(urlToWoeid, (error, response, body) => {
                if (body) {
                    resolve(JSON.parse(body));
                } else {
                    reject('err');
                }
            });
        }).then((cityList) => {
            let url = `https://www.metaweather.com/api/location/${cityList[0].woeid}/`;

            return new Promise((resolve, reject) => {
                request.get(url, (error, response, body) => {
                    if (body) {
                        resolve(JSON.parse(body));
                    } else {
                        reject('err');
                    }
                });
            });
        });
    }
}

module.exports = Weather;
