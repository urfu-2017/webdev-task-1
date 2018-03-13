'use strict';

const NewsAPI = require('newsapi');
const url = require('url');

const numberMonth = require('./numberMonth');

const newsapi = new NewsAPI('22e0046e75c54aebb1edc07de4ce08c4');

const topHeadlines = (category, country = 'ru', language = 'ru') => newsapi.v2.topHeadlines({
    sortBy: 'popularity',
    category: category,
    language: language,
    country: country
});

const getNews = (category) => {
    return topHeadlines(category)
        .then(result => result.articles)
        .then(onlyNews => parseUseful(onlyNews));
};

function parseUseful(news) {
    return news.map(article => {
        let tempTime = new Date(article.publishedAt);
        let day = tempTime.getUTCDate();
        let month = numberMonth(tempTime.getUTCMonth());
        let date = day + ' ' + month;
        let tempUrl = url.parse(article.url);
        let sourceUrl = tempUrl.protocol + '//' + tempUrl.host + '/';

        return {
            source: article.source.name,
            sourceUrl: sourceUrl,
            title: article.title,
            description: article.description,
            url: article.url,
            urlToImage: article.urlToImage,
            publishedAt: date
        };
    });
}

module.exports = getNews;
