'use strict';
const NewsAPI = require('newsapi');

const Article = require('../models/article');

const newsapi = new NewsAPI(process.env.NEWS_API_KEY);

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
