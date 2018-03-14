'use strict';

const News = require('../models/news');

exports.news = async (req, res) => {
    const country = req.query.country || 'ru';
    const news = await News.getData(req.params.category, country);
    res.render('index', { news });
};
