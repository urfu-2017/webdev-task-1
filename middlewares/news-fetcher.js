'use strict';

const queryString = require('query-string');
const formatDate = require('../config/date-format');
const request = require('request');
const keyString = '6ccd50aa452a4d48827db4c4a86077d5';
const baseUrl = 'https://newsapi.org/v2/top-headlines?';
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
    const category = req.params.category;
    const url = `${baseUrl}${queryString.stringify({ category, country, apiKey: keyString })}`;
    console.info(url.toString());
    const news = await getNews(url);

    return getFirstFiveNews(news);
};
