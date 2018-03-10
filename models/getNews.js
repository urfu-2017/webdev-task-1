'use strict';
const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('464f888a3f1c43fe940b633d0c941896');

class News {
    static getNews(category, country) {
        return newsapi.v2.topHeadlines({
            category: category,
            language: 'ru',
            country: country
        });
    }

}

module.exports = News;
