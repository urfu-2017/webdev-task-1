'use strict';

const News = require('../models/news');

exports.news = (req, res) => {
    let country = req.query.country || 'ru';
    News.getNews(req.params.category, country).then(news => {
        res.render('newsBoard', { news });
    });
};
