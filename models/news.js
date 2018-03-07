'use strict';

const fetch = require('node-fetch');
const Weather = require('../models/weather');

class News {
    static async getNewsJSON(req) {
        const newsAPIBaseUrl = 'https://newsapi.org/v2/top-headlines?';
        const country = req.query.country || 'us';
        const category = req.params.category;
        const key = process.env.KEY;
        const newsAPIUrl = newsAPIBaseUrl +
            'country=' + country +
            '&category=' + category +
            '&apiKey=' + key;
        const response = await fetch(newsAPIUrl);

        return await response.json();
    }

    static getNewsData(newsJSON) {
        const articles = newsJSON.articles;

        return articles.map(element => {
            return {
                title: element.title,
                url: element.url,
                image: element.urlToImage,
                description: element.description,
                time: News.parseTime(element.publishedAt),
                source: element.source.name
            };
        });
    }

    static parseTime(time) {
        const [date, hhmmss] = time.split('T');
        const hhmm = hhmmss.slice(0, 5);

        return Weather.parseDate(date) + ' в ' + hhmm;
    }
}

module.exports = News;
