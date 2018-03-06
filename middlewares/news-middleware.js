/* eslint-disable */

'use strict';

const formatDate = require('./date-format');
const request = require('request');
const keyString = '&apiKey=6ccd50aa452a4d48827db4c4a86077d5';
const baseUrl = 'https://newsapi.org/v2/top-headlines?category=';
const defaultCountry = 'us';

const getNews = url => new Promise((resolve,reject) => {
    request(url, (err, response, body) => {
        if (err) {
            reject(new Error('Request failed'));
            return;
        }
        resolve(JSON.parse(body));
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
}

module.exports = (req, res, next) => {
    let country = req.query.country;
    if (!country) {
        country = defaultCountry;
    }
    const workingUrl = 'https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=6ccd50aa452a4d48827db4c4a86077d5'
    const url = baseUrl + req.path.substr(1) + '&country=' + country + keyString;
    getNews(url)
        .then(data => {
            console.info('ok');
            res.locals.newsArticles = getFirstFiveNews(data.articles);
            next();
        })
        .catch(error => {
            console.error(error);
            next();
        })
}