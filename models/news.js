'use strict';

const NewsAPI = require('newsapi');
const categories = require('../data');
const token = process.env.token;
const news = new NewsAPI(token);

exports.getAllCategories = () => {
    return categories;
};

exports.getNews = (category, country, language) =>{
    return news.v2.topHeadlines({
        category,
        language,
        country
    }).then(res => {

        return res.articles;
    });
};
