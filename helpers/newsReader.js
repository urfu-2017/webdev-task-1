'use strict';

const fetch = require('node-fetch');

const API_KEY = '123ce955c36e452094dac4fb923a91d6';
const DEFAULT_COUNTRY = 'ru';

class NewsReader {
    static async getAllNews(topic, country) {
        if (!country) {
            country = DEFAULT_COUNTRY;
        }

        var url = 'https://newsapi.org/v2/top-headlines?' +
            `country=${country}&` +
            `category=${topic}&` +
            `apiKey=${API_KEY}`;

        return await fetch(url)
            .then(response => response.json())
            .then(json => {
                return json.articles.map(article => {
                    return {
                        source: article.source.name,
                        title: article.title,
                        description: article.description,
                        urlToImage: article.urlToImage,
                        publishedAt: article.publishedAt
                    };
                });
            });
    }
}

module.exports = NewsReader;
