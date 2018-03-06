'use strict';

const { getParceBody } = require('./commonRepository');
const News = require('../models/news');

const apiKey = 'ec92adb8527b48ae81a476953bd5c758';
const country = 'ru';
const apiString = 'https://newsapi.org/v2/top-headlines?' +
    `country=${country}&category={{category}}&apiKey=${apiKey}`;
// primer https://newsapi.org/v2/top-headlines?country=ru&apiKey=ec92adb8527b48ae81a476953bd5c758

const getNews = data => {
    return data.status === 'ok' ? data.articles.map(item => new News(item)) : {};
};

module.exports = async function getNewsByCategory(category) {
    const apiURL = category === 'top-headlines'
        ? apiString.replace('{{category}}', '')
        : apiString.replace('{{category}}', category);
    const body = await getParceBody(apiURL);

    return getNews(body);
};


