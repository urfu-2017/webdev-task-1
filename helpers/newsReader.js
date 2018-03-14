'use strict';

const fetch = require('node-fetch');
const config = require('../public/settings/config');

const DEFAULT_COUNTRY = 'ru';

class NewsReader {
    static async getAllNews(topic, country) {
        if (!country) {
            country = DEFAULT_COUNTRY;
        }

        let url = `${config.newsApiUrl}` +
            `country=${country}&` +
            `category=${topic}&` +
            `apiKey=${config.apiKey}`;

        return await fetch(url)
            .then(response => response.json())
            .then(json => {
                return json.articles.map(article => {
                    return {
                        source: article.source.name,
                        title: article.title,
                        description: article.description,
                        urlToImage: article.urlToImage,
                        publishedAt: article.publishedAt.slice(0, 10)
                    };
                });
            });
    }
}

module.exports = NewsReader;
