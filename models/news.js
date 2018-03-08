'use strict';

const NewsAPI = require('newsapi');
const news = new NewsAPI('2e4e625d90544fcf8c854716adfb8b0e');

class getNews {
    static findByCategory(name) {
        return news.v2.topHeadlines({
            category: name,
            language: 'ru',
            country: 'ru'
        });
    }
}

exports.getNews = getNews;
