'use strict';

const formatDate = require('../config/date-format');
const request = require('request');
const keyString = '&apiKey=6ccd50aa452a4d48827db4c4a86077d5';
const baseUrl = 'https://newsapi.org/v2/top-headlines?category=';
const defaultCountry = 'us';

const getNews = url => new Promise((resolve, reject) => {
    request(url, (err, response, body) => {
        if (err) {
            reject(new Error('Request failed'));

            return;
        }
        body = JSON.parse(body);
        if (Array.isArray(body.articles)) {
            resolve(body.articles);

            return;
        }
        reject(new Error('Response no data'));
    });
});

const getFirstFiveNews = data => {
    const articles = [];
    for (let i = 0; i < 5; i++) {
        const element = data[i];
        const newsDate = formatDate(element.publishedAt);
        articles.push({ newsTitle: element.title, newsTime: newsDate,
            newsContent: element.description, newsSource: element.source.name,
            newsUrl: element.url, newsImage: element.urlToImage });
    }

    return articles;
};

module.exports = async function renderNews(req) {
    let country = req.query.country;
    if (!country) {
        country = defaultCountry;
    }
    const url = baseUrl + req.path.substr(1) + '&country=' + country + keyString;
    const news = await getNews(url);

    return getFirstFiveNews(news);
};
