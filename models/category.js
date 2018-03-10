'use strict';


const NewsApi = require('newsapi');

const categories = require('../mocks/categories');

const key = process.env.key;
const newsApi = new NewsApi(key);

function getFirstFiveArticles(articles) {
    return articles.articles.slice(0, 5)
        .map(article => {
            return {
                url: article.url,
                title: article.title,
                source: article.source.name,
                imageUrl: article.urlToImage,
                description: article.description,
                publishedAt: new Date (article.publishedAt).toLocaleString()
            };
        });
}

exports.getAllCategories = () => {
    return categories;
};

exports.getArticles = (category, country, language) =>{
    return newsApi.v2.topHeadlines({
        category,
        language,
        country
    }).then(res => res.totalResults > 5 ? getFirstFiveArticles(res) : res);
};
