'use strict';

const fetch = require('node-fetch');
const { stringify } = require('querystring');

const { apiLink, apiKey, defaultCountry } = require('../config/news-api');
const { formatDate } = require('../middlewares/date');

exports.news = (req, res) => {
    const data = JSON.parse(JSON.stringify(res.locals));

    const query = {
        country: req.query.country || defaultCountry,
        category: req.params.category,
        apiKey
    };

    const defaultQuery = {
        country: defaultCountry,
        category: req.params.category,
        apiKey
    };


    fetchNews(query)
        .then(news => news.length ? news : fetchNews(defaultQuery))
        .then(news => {
            news.forEach(oneNews => {
                oneNews.date = formatDate(new Date(oneNews.publishedAt));
            });
            data.news = news;
            res.render('news', data);
        });
};

function fetchNews(query) {
    const querystring = stringify(query);

    return fetch(`${apiLink}?${querystring}`)
        .then(response => response.json())
        .then(json => json.articles.slice(0, 5));
}
