'use strict';

const config = require('config');
const NewsApi = require('newsapi');
const newsapi = new NewsApi(config.get('newsApiKey'));
const LRU = require('lru-cache');


const Article = require('../models/article');

class ArticlesClient {
    constructor(categories) {
        this._categories = categories;
        this._cache = new LRU({ maxAge: config.get('cacheMaxAge') });
    }

    find(category, country) {
        const key = JSON.stringify({ category, country });
        if (this._cache.has(key)) {
            return Promise.resolve(this._cache.get(key));
        }

        return newsapi.v2.topHeadlines({
            category,
            country: country || config.get('defaultCountry')
        })
            .then(apiResponse => apiResponse.articles.map(article => new Article(article)))
            .then(result => {
                this._cache.set(key, result);

                return result;
            });
    }

    get categories() {
        return this._categories;
    }
}

module.exports = new ArticlesClient(require('../content/categories'));
