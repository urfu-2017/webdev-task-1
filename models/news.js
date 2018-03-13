'use strict';

const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('7c920adea313430c8ff97dadb56c4a38');
const { isUndefined } = require('util');

module.exports.getNews = async (req) => {
    const response = await newsapi.v2.topHeadlines({
        category: req.params.topic,
        language: 'ru',
        country: req.query.country
    });
    response.articles = response.articles.map(element => {
        element.publishedAt = element.publishedAt.slice(0, 10) +
            ' ' + element.publishedAt.slice(14, 19);

        return element;
    });
    let endOfUrl = isUndefined(req.query.query)
        ? `lattlong=${req.query.lat},${req.query.lon}` : `query=${req.query.query}`;
    endOfUrl = endOfUrl + '&country=' + req.query.country;
    response.endOfUrl = endOfUrl;

    return response;
};
