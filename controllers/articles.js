'use strict';

const Articles = require('../models/articles');

module.exports.categories = function (req, res) {
    res.render('index', {
        categories: Articles.categories()
    });
};

module.exports.articles = function (req, res) {
    Articles.findArticles(req.params.category, req.query.country)
        .then(articles => {
            res.render('category', { articles });
        });
};
