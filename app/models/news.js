'use strict';

const request = require('request');

const API_KEY = '6d4e307d3a9d476abe4a932405e438f4';

class News {
    constructor(country, category) {
        this.country = country;
        this.category = category;
    }

    static find(country, category) {
        return new Promise((resolve, reject) => {
            const newsUrl = `https://newsapi.org/v2/top-headlines?
                country=${country}&category=${category}&apiKey=${API_KEY}`;
            request.get(newsUrl, (error, response, body) => {
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
