'use strict';

const News = require('../models/news');

const DEFAULT_COUNTRY = 'ru';

exports.list = async (req, res) => {
    const { category } = req.params;
    const country = req.query.country || DEFAULT_COUNTRY;
    const news = await News.getNews(category, country);

    res.render('news', { news, returnLink: '/' });
};
