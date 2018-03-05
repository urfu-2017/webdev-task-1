'use strict';

const fetch = require('node-fetch');

class News {
    static async getNewsJSON(req) {
        const newsAPIBaseUrl = 'https://newsapi.org/v2/top-headlines?';
        const country = req.query.country;
        const category = req.params.category;
        const key = process.env.KEY;
        const newsAPIUrl = newsAPIBaseUrl +
            'country=' + country +
            '&category=' + category +
            '&apiKey=' + key;
        const response = await fetch(newsAPIUrl);

        return await response.json();
    }
}

module.exports = News;
