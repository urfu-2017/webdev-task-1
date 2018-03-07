'use strict';

const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('4c0a86d23c184ab2bbddacb91c2405fa');

class NewsManager {
    static findByCategory(name) {
        return newsapi.v2.topHeadlines({
            category: name,
            language: 'ru',
            country: 'ru'
        });
    }
}

exports.NewsManager = NewsManager;
