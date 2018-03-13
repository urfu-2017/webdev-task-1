'use strict';

const fetch = require('node-fetch');
const querystring = require('querystring');

const Article = require('../models/article');
const API = require('../config/default.json').newsApi;

function parseFeed(apiData) {
    return apiData.articles.map(article => new Article({
        url: article.url,
        title: article.title,
        description: article.description,
        source: article.source.name.toLowerCase(),
        image: article.urlToImage,
        publishDatetime: article.publishedAt
            .replace('T', ' ')
            .replace('Z', '')
    }));
}

module.exports.getNews = async (category, country) => {
    const query = querystring.stringify({
        apiKey: API.apiKey,
        category: category,
        country: country });
    const requestUrl = API.url + API.search + query;
    const apiData = await fetch(requestUrl).then(result => result.json());

    if (apiData.status !== 'ok' || apiData.totalResults === 0) {
        return { message: API.newsNotFound };
    }

    return { feed: parseFeed(apiData) };
};
