'use strict';
const querystring = require('querystring');
const fetch = require('node-fetch');

const config = require('../config');

class Post {
    constructor({ title, image, description, publishedDate, source }) {
        this.title = title;
        this.image = image;
        this.description = description;
        this.publishedDate = publishedDate;
        this.source = source;
    }

    static async list(category, country) {
        const query = querystring.stringify({ category, country, apiKey: config.newsApiKey });
        const response = await fetch(config.newsApiUrl + query);

        const json = await response.json();

        return json.articles.map(article => new Post({
            title: article.title,
            image: article.urlToImage,
            description: article.description,
            source: article.source.name,
            publishedDate: new Date(article.publishedAt)
        }));
    }
}

module.exports = Post;
