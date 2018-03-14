'use strict';

const request = require('request');
const { newsUrl, newsApiToken } = require('../../config');

class News {
    constructor() {
        this.country = 'ru';
    }
    static find({ category, country }) {
        let url = newsUrl + `country=${country || this.country}`;
        if (category !== 'all') {
            url += `&category=${category}`;
        }
        url += newsApiToken;

        return new Promise((resolve, reject) => {
            request.get(url, (error, response, body) => {
                body = JSON.parse(body);
                for (let i = 0; i < body.articles.length; i++) {
                    const options = { month: 'long', day: 'numeric' };
                    const date = new Date(body.articles[i].publishedAt);
                    const formattedDate = date.toLocaleDateString('en-US', options);
                    body.articles[i].publishedAt = formattedDate;
                }
                if (body) {
                    resolve(body);
                } else {
                    reject(new Error('NEWS_NOT_FOUND'));
                }
            });
        });
    }
}

module.exports = News;
