'use strict';

const fetch = require('node-fetch');

const NewsModel = require('../models/news');

exports.startPage = (req, res) => {
    let allNews = NewsModel.findAll();
    let data = { allNews: allNews };
    res.render('index', data);
};

exports.item = (req, res) => {
    const name = req.params.name;
    const oneNews = NewsModel.find(name);
    const englishName = oneNews.englishName;
    const data = { oneNews: oneNews };

    if (oneNews) {
        if (!res.locals.url.includes('country=')) {
            res.locals.queryNews = '/?country=ru';
        } else {
            res.locals.queryNews = res.locals.url;
        }
        res.locals.queryNews += '&category=' + englishName;
        var url = 'https://newsapi.org/v2/top-headlines' +
        `${res.locals.queryNews}&apiKey=aed1f5bff66c481299f733632f0b89e7`;
        fetch(url)
            .then(body => body.json())
            .then(json => {
                res.locals.articles = json.articles;
                res.locals.articles.forEach(article => {
                    article.publishedAt = article.publishedAt.substr(0, 10);
                });
                res.render('news', data);
            })
            .catch(() => res.sendStatus(500));
    } else {
        res.sendStatus(404);
    }
};
