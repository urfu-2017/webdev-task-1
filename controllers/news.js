'use strict';

const fetch = require('node-fetch');
const { stringify } = require('querystring');

const API_KEY = '79ee48cc71eb417b9acb8b6600017a62';
const BASE_LINK = 'https://newsapi.org/v2/top-headlines';
const DEFAULT_COUNTRY = 'ru';

exports.news = (req, res) => {
    let data = JSON.parse(JSON.stringify(res.locals));

    let query = {
        country: req.query.country || DEFAULT_COUNTRY,
        category: req.params.category,
        apiKey: API_KEY
    };

    let defaultQuery = JSON.parse(JSON.stringify(query));
    defaultQuery.country = DEFAULT_COUNTRY;


    fetchNews(query)
        .then(news => news.length ? news : fetchNews(defaultQuery))
        .then(news => {
            news.forEach(oneNews => {
                oneNews.date = new Date(oneNews.publishedAt).toDateString();
            });
            data.news = news;
            res.render('news', data);
        }
        );
};

function fetchNews(query) {
    const querystring = stringify(query);

    return fetch(`${BASE_LINK}?${querystring}`)
        .then(response => response.json())
        .then(json => json.articles.slice(0, 5));
}
