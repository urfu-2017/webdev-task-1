'use strict';

const articlesClient = require('../clients/articles');

module.exports.categories = (req, res) => {
    res.render('index', {
        categories: articlesClient.categories
    });
};

module.exports.articles = (req, res) => {
    articlesClient.find(req.params.category, req.query.country)
        .then(articles => res.render('category', { articles }));
};
