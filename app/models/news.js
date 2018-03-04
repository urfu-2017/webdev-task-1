'use strict';

var request = require('request');

class News {
    constructor({ category, country }) {
        this.category = category;
        this.country = country;
    }
    static find(category, country) {
        let url = 'https://newsapi.org/v2/top-headlines?';
        if (country) {
            url += `country=${country}`;
        } else {
            url += 'country=ru';
        }
        if (category !== 'all') {
            url += `&category=${category}`;
        }
        url += '&apiKey=d333fab019c840009dd5a977f05c7280';

        return new Promise((resolve, reject) => {
            request.get(url, (error, response, body) => {
                if (body) {
                    resolve(JSON.parse(body));
                } else {
                    reject('err');
                }
            });
        });
    }
}

module.exports = News;
