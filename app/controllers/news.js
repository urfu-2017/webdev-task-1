'use strict';

const NewsItem = require('../models/news-item');
const NewsApi = require('newsapi');
const token = require('../public/token.json');
const newsapi = new NewsApi(token);

exports.list = async (req, res) => {
    const { category } = req.query;
    const response = await newsapi.v2.topHeadlines(category);
    const news = response.articles.map(article => new NewsItem(article));

    res.render('index', { news });
};
