'use strict';

const moment = require('moment');
require('moment/locale/ru');

const getNewsByCategory = require('../models/news').getNewsByCategory;

module.exports.newsController = function newsController(req, res) {
    const category = req.params.category;
    const weather = res.locals.weather;
    getNewsByCategory(category, req.query.country)
        .then(response => {
            let news = response.body.articles.filter(
                article => article.description
            );
            news = formatNews(news);
            res.render('news', { news, weather });
        });
};

function formatNews(news) {
    for (let item of news) {
        item.publishedAt = moment(item.publishedAt).format('LLL');
    }

    return news;
}
