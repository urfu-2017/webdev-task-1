'use strict';

const NewsAPI = require('newsapi');

const PieceOfNews = require('../models/pieceOfNews').PieceOfNews;

const newsapi = new NewsAPI('1e973c9bf65b4af4a73439c14dbf5050');

exports.getList = (options, cb) => {
    newsapi.v2.topHeadlines(options)
        .then(rawNews => cb(rawNews.articles.map(piece => new PieceOfNews(piece))))
        .catch(err => console.error(err));
};
