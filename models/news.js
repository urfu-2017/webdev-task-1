'use strict';

const config = require('config');
const NewsAPI = require('newsapi');

const newsapi = new NewsAPI(config.get('keyNews'));

class News {
    constructor({ country = 'ru', category }, main) {
        this.country = country;
        this.categories = category;
        this.url = null;
        this.main = main;
    }

    get() {
        this.main.categories.categories.forEach(element => {
            if (element.category === this.categories) {
                this.url = element.url;
            }
        });

        return newsapi.v2.topHeadlines({
            category: this.url,
            country: this.country
        }).then(response => {
            const data = {};
            data.articles = response.articles;
            data.articles.forEach((article) => {
                const options = { month: 'long', day: 'numeric' };
                const date = new Date(article.publishedAt);
                article.date = date.toLocaleDateString('ru-Ru', options);
            });

            return data;
        });
    }
}

module.exports = News;
