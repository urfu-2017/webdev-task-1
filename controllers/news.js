'use strict';

const NewsArticle = require('../models/news-article');

exports.list = async (req, res) => {
    const { query } = req;
    const { category } = req.params;
    const news = await NewsArticle.findAll({ category, country: query.country });
    const resultData = Object.assign({ news }, res.locals);

    res.render('category', resultData);
};
