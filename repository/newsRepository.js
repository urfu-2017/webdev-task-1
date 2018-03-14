'use strict';

const { getParceBody } = require('./commonRepository');
const News = require('../models/news');

const apiKey = 'ec92adb8527b48ae81a476953bd5c758';
const apiString = 'https://newsapi.org/v2/top-headlines?' +
    `country={{country}}&category={{category}}&apiKey=${apiKey}`;

const getNews = data => {
    return data.status === 'ok' ? data.articles.map(item => new News(item)) : {};
};

module.exports = async function getNewsByCategory(category, country) {
    const reqCountry = country === undefined ? 'ru' : country;
    const reqCategory = category === 'top-headlines' ? '' : category;
    let apiURL = apiString.replace('{{category}}', reqCategory);
    apiURL = apiURL.replace('{{country}}', reqCountry);
    const body = await getParceBody(apiURL);

    return getNews(body);
};
