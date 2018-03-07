'use strict';

const defaultCountry = 'ru';

const NewsApi = require('newsapi');
const newsapi = new NewsApi('2ab36d81886f43de897561b53525dde7');

const categories = require('../content/categories');

class Articles {
    static findArticles(category, country) {
        return newsapi.v2.topHeadlines({
            category,
            country: country || defaultCountry
        }).then(apiResponse => apiResponse.articles);
    }

    static categories() {
        return categories;
    }
}

module.exports = Articles;
