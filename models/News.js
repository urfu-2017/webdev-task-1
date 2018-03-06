'use strict';

const querystring = require('querystring');

const requestify = require('requestify');

const CATEGORIES = [
    'business',
    'entertainment',
    'general',
    'health',
    'science',
    'sport',
    'technology'
];

class News {
    constructor(apiKey) {
        this._apiKey = apiKey;
    }

    hasCategory(category) {
        return CATEGORIES.some(c => c === category);
    }

    async get(category, country) {
        const query = querystring.stringify({
            apiKey: this._apiKey,
            category,
            country
        });
        const response = await requestify.get(`https://newsapi.org/v2/top-headlines?${query}`);

        response.getBody();
        const json = JSON.parse(response.body);

        if (json.status === 'ok') {
            return json.articles;
        }

        throw new Error('Can\' get articles!');
    }
}

module.exports = News;
