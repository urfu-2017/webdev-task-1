'use strict';

const config = require('config');

const NewsAPI = require('newsapi');
const apiKey = config.get('news-api.key');
const newsapi = new NewsAPI(apiKey);

class Publications {

    static getAsync(category, query) {
        const { country } = query;
        const newsRequestParams = {
            category, country, language: 'ru'
        };

        return newsapi.v2.topHeadlines(newsRequestParams);
    }

}

module.exports = Publications;
