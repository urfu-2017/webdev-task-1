'use strict';

const NewsArticle = require('../models/news-article');

exports.list = async (req, res) => {
    const { country } = req.query;
    const { category } = req.params;
    const news = await NewsArticle.findAll({ category, country });

    res.render('category', Object.assign(res.locals, { news }));
};
