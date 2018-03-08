'use strict';

const fetch = require('node-fetch');
const querystring = require('querystring');
const Article = require('../models/article');

exports.getNews = async (req, res) => {
    const requestParams = querystring.stringify({
        'apiKey': process.env.NEWS_API_KEY,
        'country': req.query.country,
        'category': req.path.split('/')[2]
    });

    const recievedNews = await fetch(`https://newsapi.org/v2/top-headlines?${requestParams}`);
    const newsInJson = await recievedNews.json();
    const articles = newsInJson.articles.map(articleInfo => new Article(articleInfo));

    res.render('news', {
        'articles': articles,
        'homelink': '/?' + querystring.stringify(req.query),
        'weather': req.weatherInfo
    });
};

