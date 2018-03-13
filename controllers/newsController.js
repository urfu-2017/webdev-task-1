'use strict';

const getNewsByCategory = require('../models/news').getNewsByCategory;

module.exports.newsController = function newsController(req, res) {
    const category = req.params.category;
    const weather = res.locals.weather;
    getNewsByCategory(category, req.query.country)
        .then(response => {
            const news = response.body.articles.filter(
                article => article.description
            );
            res.render('news', { news, weather });
        });
};
