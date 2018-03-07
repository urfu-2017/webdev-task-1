'use strict';

const NewsApi = require('newsapi');
const newsapi = new NewsApi('edf21ea8b1fe463eb20ad939bcf524f2');

class News {
    static getNews(category, country) {
        return newsapi.v2.topHeadlines({
            category, country
        }).then(response => response.articles);
    }
}

module.exports = News;
