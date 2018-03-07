'use strict';

const NewsApi = require('newsapi');

const categories = require('../mocks/categories');
const key = '674a8a69bfbf43798885b56551490df4';
const newsApi = new NewsApi(key);


class Category {
    static getAllCategories() {
        return categories;
    }

    static getNews(category, country, language) {
        return newsApi.v2.topHeadlines({
            category,
            language,
            country
        }).then(res => {
            return res.totalResults > 5 ? getFirstFiveArticles(res) : res;
            // console.info('Сould not receive news');
        });
    }
}


function getFirstFiveArticles(articles) {

    return articles.articles.slice(0, 5)
        .map((article) => {
            return {
                url: article.url,
                title: article.title,
                source: article.source.name,
                urlToImage: article.urlToImage,
                description: article.description,
                publishedAt: new Date (article.publishedAt).toLocaleString()
            };
        });
}

module.exports = Category;

