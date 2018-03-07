'use strict';

const request = require('request');
const querystring = require('querystring');

const URL = 'https://newsapi.org/v2/top-headlines';

function newsHelper(query) {
    let resultUrl = URL;
    if (query) {
        resultUrl += `?${query}`;
    }
    const options = {
        method: 'GET',
        url: resultUrl,
        json: true
    };

    return createRequestPromise(options);
}

function createRequestPromise(options) {
    return new Promise((resolve) => {
        request(options, function (err, res, body) {
            if (err) {
                return resolve(err);
            }

            return resolve(body);
        });
    });
}


class NewsArticle {
    constructor({ sourceName, title, description, urlToImage, publishedAt }) {
        this.sourceName = sourceName;
        this.title = title;
        this.description = description;
        this.urlToImage = urlToImage;
        this.publishedAt = publishedAt;
    }

    static async findAll(category, country) {
        let storage = [];
        const query = querystring.stringify({ 'apiKey': '312ce60d1fca4335896fee931ab1a01b',
            'country': country, 'category': category });
        let news = (await newsHelper(query)).articles;
        for (const newsArticle of news) {
            newsArticle.publishedAt = (new Date(newsArticle.publishedAt)).toDateString();
            newsArticle.sourceName = newsArticle.source.name;
            storage.push(new NewsArticle(newsArticle));
        }

        return Promise.resolve(storage);
    }
}

module.exports = NewsArticle;
