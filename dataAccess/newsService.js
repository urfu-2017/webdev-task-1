'use strict';

const NewsApi = require('newsapi');

const newsClient = new NewsApi('2eef427492534f2eb16daae98202528b');
const defaultCountry = 'ru';

class NewsService {

    async getByCategory(category, country) {
        const newsResponse = await newsClient.v2.topHeadlines({
            category: category.name,
            country: country || defaultCountry
        });

        return newsResponse.status === 'ok'
            ? newsResponse.articles
            : [];
    }
}

module.exports = NewsService;
