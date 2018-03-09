'use strict';
const config = require('../config/common');
const NewsAPI = require('newsapi');
const newsapi = new NewsAPI(config.apiKey);

class News {

    static getCategory() {
        return [
            { url: 'business', title: 'Бизнес' },
            { url: 'entertainment', title: 'Развлечения' },
            { url: 'general', title: 'Общее' },
            { url: 'health', title: 'Здоровье' },
            { url: 'science', title: 'Наука' },
            { url: 'sports', title: 'Спорт' },
            { url: 'technology', title: 'Технологии' }
        ];
    }

    static getNews(category, country) {
        return newsapi.v2.topHeadlines({
            category: category,
            country: country
        }).then(response => {
            return response.articles
                .map((article) => {
                    return {
                        source: article.source.name,
                        title: article.title,
                        description: article.description,
                        url: article.url,
                        urlToImage: article.urlToImage,
                        publishedAt: new Date (article.publishedAt).toLocaleDateString()
                    };
                });
        });
    }

}

module.exports = News;
