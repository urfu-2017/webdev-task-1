'use strict';

const NewsAPI = require('newsapi');

const PieceOfNews = require('../models/pieceOfNews');

require('dotenv').config();
const newsapi = new NewsAPI(process.env.NEWSAPI_TOKEN);

exports.getList = (options) => {
    return newsapi.v2.topHeadlines(options)
        .then(rawNews => rawNews.articles.map(piece => new PieceOfNews(piece)));
};
