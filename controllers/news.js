'use strict';

const News = require('../models/news');

exports.newsList = (req, res) => {
    const category = req.params.category;
    const country = req.query.country || 'us';

    News.getNews(category, country).then(news => {
        res.render('news', {
            title: category,
            news: news
        });
    });
};
