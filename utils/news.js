'use strict';

const fs = require('fs');
const querystring = require('querystring');
const fetch = require('node-fetch');

class NewsFetcher {

    constructor(apiKey) {
        this.apiKey = apiKey;
        this.apiUrl = 'https://newsapi.org/v2/top-headlines';
    }

    static initFromFile(filename) {
        const data = fs.readFileSync(filename, 'utf-8');
        try {
            const key = JSON.parse(data).newsApiKey;

            return new NewsFetcher(key);
        } catch (ex) {
            console.error(ex);
        }
    }

    async getNews(category, country) {
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
}

exports.newsFetcher = NewsFetcher.initFromFile('keys.json');
