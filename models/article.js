'use strict';

const fetch = require('node-fetch');
const querystring = require('querystring');

class Article {
    constructor({ title, description, source, publishedAt, urlToImage, url }) {
        this.sourceName = source.name;
        this.publicationDate = publishedAt;
        this.url = url;
        this.title = title;
        this.description = description;
        this.urlToImage = urlToImage;
    }

    static async fetchAll(category, country) {
        const requestParams = querystring.stringify({
            apiKey: process.env.NEWS_API_KEY,
            country,
            category
        });

        const recievedNews = await fetch(`https://newsapi.org/v2/top-headlines?${requestParams}`);
        const newsInJson = await recievedNews.json();

        return newsInJson.articles.map(articleInfo => new Article(articleInfo));
    }
}

module.exports = Article;

