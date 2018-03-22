'use strict';

const fs = require('fs');
const querystring = require('querystring');
const fetch = require('node-fetch');

class News {
    constructor({ title, description, link, date, source, image }) {
        this.title = title;
        this.description = description;
        this.date = date;
        this.source = source;
        this.image = image;
        this.link = link;
    }
}

let key;

class NewsFetcher {

    constructor(apiKey) {
        this.apiKey = apiKey;
        this.apiUrl = 'https://newsapi.org/v2/top-headlines';
    }

    async loadFromApi(category, country) {
        const params = querystring.stringify({ category, country, apiKey: this.apiKey });
        const url = `${this.apiUrl}?${params}`;
        try {
            const res = await fetch(url);
            const data = await res.json();
            if (data.status !== 'ok') {
                console.error(data);

                return { error: data.message };
            }

            return data.articles;
        } catch (ex) {
            console.error(ex);

            return { error: 'Не удалось подключиться к серверу новостей' };
        }
    }

    async getNews(category, country) {
        const articles = await this.loadFromApi(category, country);
        if (articles.error) {
            return articles;
        }
        const news = articles.reduce((result, current) => {
            const params = {
                title: current.title,
                description: current.description,
                link: current.url,
                date: current.publishedAt,
                source: current.source.name,
                image: current.urlToImage
            };
            const article = new News(params);
            result.push(article);

            return result;
        }, []);

        return news;
    }
}

exports.initNewsFetcher = function initNewsFetcher(filename) {
    const data = fs.readFileSync(filename, 'utf-8');
    try {
        key = JSON.parse(data).newsApiKey;

        return new NewsFetcher(key);
    } catch (ex) {
        console.error(ex);
    }
};

exports.News = NewsFetcher;
