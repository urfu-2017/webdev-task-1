'use strict';

const { URL } = require('url');

const request = require('request');
const queryString = require('query-string');

class Weather {
    constructor(query) {
        this.query = query;
    }

    static find(query) {

        let url = new URL('https://www.metaweather.com/api/location/search/?');

        let parsed = {};
        parsed.query = query;

        url += queryString.stringify(parsed);

        return new Promise((resolve, reject) => {
            request.get(url, (error, response, body) => {
                if (body) {
                    resolve(JSON.parse(body));
                } else {
                    reject(error);
                }
            });
        }).then((result) => {
            let secondUrl = new URL('https://www.metaweather.com/');
            secondUrl.pathname = `api/location/${result[0].woeid}/`;

            return new Promise((resolve, reject) => {
                request.get(secondUrl.href, (error, response, body) => {
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
