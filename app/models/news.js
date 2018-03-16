'use strict';

const { URL } = require('url');

const request = require('request');
const queryString = require('query-string');

const API_KEY = '6d4e307d3a9d476abe4a932405e438f4';

class News {
    constructor(country, category) {
        this.country = country;
        this.category = category;
    }

    static find(country, category) {
        let url = new URL('https://newsapi.org/v2/top-headlines?');

        let parsed = {};
        parsed.country = country;
        parsed.category = category;
        parsed.apiKey = API_KEY;

        url += queryString.stringify(parsed);

        return new Promise((resolve, reject) => {
            request.get(url, (error, response, body) => {
                if (body) {
                    resolve(JSON.parse(body));
                } else {
                    reject(error);
                }
            });
        });
    }
}

module.exports = News;
