'use strict';

const NewsAPI = require('newsapi');
const apiKey = process.env.NEWS_API_KEY;
const newsapi = new NewsAPI(apiKey);

class Articles {

    static getAsync(category, query) {
        const { country } = query;
        const newsRequestParams = {
            category, country, language: 'ru'
        };

        return newsapi.v2.topHeadlines(newsRequestParams);
    }

}

module.exports = Articles;
