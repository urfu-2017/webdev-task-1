'use strict';
const { key } = require('../newsapi.json');
const baseUrl = 'https://newsapi.org/v2/top-headlines';
const fetch = require('node-fetch');

class News {
    static async getNews(country, category) {
        let res = await fetch(baseUrl + `?country=${country}&category=${category}&apiKey=${key}`);
        let result = await res.json();
        result.articles.forEach((article, index, articles) => {
            let date = new Date(article.publishedAt);
            articles[index].publishedAt =
                `${date.getUTCDate()}.${date.getUTCMonth() + 1}.${date.getFullYear()}`;
        });

        return result.articles;
    }
}

exports.News = News;
