'use strict';

const NewsApi = require('newsapi');
const { newsApiKey } = require('../api.json');
const newsapi = new NewsApi(newsApiKey);

class News {
    static async getData(category, country) {
        const { articles } = await newsapi.v2.topHeadlines({
            category, country
        });

        return articles;
    }
}

module.exports = News;
