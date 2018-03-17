'use strict';

<<<<<<< HEAD
const config = require('config');
const NewsAPI = require('newsapi');

const newsapi = new NewsAPI(config.get('keyNews'));

class News {
    constructor({ country = 'ru', categories }, main) {
        this.country = country;
        this.categories = categories;
        this.url = null;
        this.main = main;
    }

    get() {
        this.main.categories.categories.forEach(element => {
=======
const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('878b2ff48cda4756831ef5375cfe4c1a');

class News {
    constructor({ country, pathname }) {
        this.country = country;
        this.categories = pathname.split('/')[2];
        this.url = null;
    }

    getNews({ main }) {
        main.categories.categories.forEach(element => {
>>>>>>> a2fefc59ae1d93e7c33b0d9143af6f5deeaedd54
            if (element.category === this.categories) {
                this.url = element.url;
            }
        });

        return newsapi.v2.topHeadlines({
            category: this.url,
<<<<<<< HEAD
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
=======
            language: 'ru',
            country: this.country
        }).then(response => {
            let answer = {};
            answer.articles = response.articles;
            answer.articles.forEach((article, index) => {
                let reg = /^\d{4}-(0?[1-9]|1[012])-(0?[1-9]|[12][0-9]|3[01])/;
                let date = reg.exec(article.publishedAt);
                article.date = date[0];
                if (!article.description || article.description === '') {
                    answer.articles.splice(index, 1);
                }
            });

            return answer;
>>>>>>> a2fefc59ae1d93e7c33b0d9143af6f5deeaedd54
        });
    }
}

module.exports = News;
