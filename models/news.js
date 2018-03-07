'use strict';

const dateformat = require('dateformat');

const { getNews } = require('./api.js');

module.exports = class News {
    static gettNews(country, category) {
        return getNews(country, category)
            .then(this.formatDatе);
    }

    static formatDatе({ body }) {
        let JSONdata = JSON.parse(body);
        JSONdata.articles.map(article => {
            article.publishedAt = dateformat(article.publishedAt, 'mmmm dS, yyyy');

            return article;
        });

        return JSONdata;
    }
};
