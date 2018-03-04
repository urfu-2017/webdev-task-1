'use strict';
const fetch = require('node-fetch');

const config = require('../config');
const baseUrl = 'https://newsapi.org/v2/top-headlines?';

class Post {
    constructor({ title, image, description, publishedDate, source }) {
        this.title = title;
        this.image = image;
        this.description = description;
        this.publishedDate = publishedDate;
        this.source = source;
    }

    static async list(category, country) {
        const response = await fetch(
            `${baseUrl}category=${category}&country=${country}&apiKey=${config.newsApiKey}`
        );
        const json = await response.json();

        if (json.status !== 'ok') {
            throw new Error('Не удалось получить данные');
        }

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
