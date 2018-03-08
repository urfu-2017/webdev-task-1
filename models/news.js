'use strict';

const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('878b2ff48cda4756831ef5375cfe4c1a');

class News {
    constructor({ country, pathname }) {
        this.country = country;
        this.categories = pathname.split('/')[2];
    }

    getNews({ main }) {
        main.categories.categories.forEach(element => {
            if (element.category === this.categories) {
                this.categories = element.url;
            }
        });

        return newsapi.v2.topHeadlines({
            category: this.categories,
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
        });
    }
}

module.exports = News;
