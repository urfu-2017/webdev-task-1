'use strict';

const dateformat = require('dateformat');
const got = require('got');
const apiKey = require('../data.json').apiKey;

module.exports = class News {
    constructor({ country }, { category }) {
        this.category = category;
        this.country = country;
    }

    getNews() {
        return this.find()
            .then(this.formatDatе);
    }

    formatDatе({ body }) {
        let JSONdata = JSON.parse(body);
        JSONdata.articles.map(article => {
            article.publishedAt = dateformat(article.publishedAt, 'mmmm dS, yyyy');

            return article;
        });

        return JSONdata;
    }

    find() {
        return got(
            'https://newsapi.org/v2/top-headlines',
            {
                query: {
                    country: this.country,
                    category: this.category,
                    apiKey
                }
            }
        );
    }
};
