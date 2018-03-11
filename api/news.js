'use strict';

const fetch = require('node-fetch');

const Article = require('../models/article');

const API = require('../config/default.json').newsApi;

function parseFeed(apiData) {
    return apiData.articles.map(article => new Article({
        title: article.title,
        description: article.description,
        source: article.source.name,
        image: article.urlToImage,
        publishDatetime: article.publishedAt
            .replace('T', ' ')
            .replace('Z', '')
    }));
}

module.exports.getNews = async (category, country) => {
    let request = API.url + API.search;

    if (category) {
        request += API.categoryParam + category;
    }

    if (country) {
        request += API.countryParam + country;
    }

    const apiData = await fetch(request).then(result => result.json());

    if (apiData.status !== 'ok' || apiData.totalResults === 0) {
        return { message: API.newsNotFound };
    }

    return { feed: parseFeed(apiData) };
};
