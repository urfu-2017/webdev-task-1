'use strict';

const config = require('config');
// const fetch = require('node-fetch');
const NewsApi = require('newsapi');

const categories = require('../mocks/categories');

const newsApi = new NewsApi(config.get('key'));


class Category {
    static getAllCategories() {
        return categories;
    }

    static getAll(country) {
        return categories.map(category => {
            return newsApi.v2.topHeadlines({
                category,
                country
            }).then(res => {
                return res;
            });
        });
    }
} 

module.exports = Category;

