'use strict';
import NewsAPI from 'newsapi';
import config from '../config/config';
const newsapi = new NewsAPI(config.apiKey);

function getNews (category) {
    return newsapi.v2.topHeadlines({
        category: category,
        language: config.language,
        country: config.country
    });
}

module.exports = getNews;
