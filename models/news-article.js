/* eslint-disable strict, indent */

'use strict';

const request = require('request');
const querystring = require('querystring');
const config = require('config');

const URL = config.get('newsURL');

function createRequestPromise(options) {
    return new Promise((resolve) => {
        request(options, (err, res, body) => {
            if (err) {
                return resolve(err);
            }

            return resolve(body);
        });
    });
}

function loadNews(query) {
    let resultUrl = URL;
    if (query) {
        resultUrl += `?${query}`;
    }
    const options = {
        method: 'GET',
        url: resultUrl,
        json: true,
    };

    return createRequestPromise(options);
}

function formatDate(date) {
    let dd = date.getDate();
    if (dd < 10) {
        dd = `0${dd}`;
    }
    let mm = date.getMonth() + 1;
    if (mm < 10) {
        mm = `0${mm}`;
    }
    let yy = date.getFullYear() % 100;
    if (yy < 10) {
        yy = `0${yy}`;
    }

    return `${dd}.${mm}.${yy}`;
  }

class NewsArticle {
    constructor({
        sourceName, title, description, urlToImage, publishedAt,
    }) {
        this.sourceName = sourceName;
        this.title = title;
        this.description = description;
        this.urlToImage = urlToImage;
        this.publishedAt = publishedAt;
    }

    static async findAll({ category, country }) {
        const query = querystring.stringify({
            apiKey: config.get('key'),
            country: country || config.get('defaultCountry'),
            category,
        });
        const news = (await loadNews(query)).articles;

        return news.map((newsArticle) => {
            newsArticle.publishedAt = formatDate(new Date(newsArticle.publishedAt));
            newsArticle.sourceName = newsArticle.source.name;
            return new NewsArticle(newsArticle);
        });
    }
}

module.exports = NewsArticle;
