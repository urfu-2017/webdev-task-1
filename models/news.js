'use strict';

const fetch = require('node-fetch');
const date = require('../helpers/date');

class News {
    static async getNewsData(country, category, key) {
        const newsAPIBaseUrl = 'https://newsapi.org/v2/top-headlines?';

        const newsAPIUrl = newsAPIBaseUrl +
            'country=' + country +
            '&category=' + category +
            '&apiKey=' + key;

        const response = await fetch(newsAPIUrl);
        const newsJSON = await response.json();
        const articles = newsJSON.articles;

        return articles.map(element => {
            return {
                title: element.title,
                url: element.url,
                image: element.urlToImage,
                description: element.description,
                time: date.parseTime(element.publishedAt),
                source: element.source.name
            };
        });
    }
}

module.exports = News;
