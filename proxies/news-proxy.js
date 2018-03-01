'use strict';
const NewsAPI = require('newsapi');

const Article = require('../models/article');
const { newsApiKey } = require('../api-keys');

const newsapi = new NewsAPI(newsApiKey);

module.exports = (category, country) => {
    return newsapi.v2.topHeadlines({
        category,
        country
    }).then(resp => resp.articles.map(article => new Article(
        {
            source: article.source.name,
            title: article.title,
            description: article.description,
            urlToImage: article.urlToImage,
            publishedAt: article.publishedAt
        }
    )));
};
