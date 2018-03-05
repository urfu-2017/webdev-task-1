'use strict';

const News = require('../models/news');

exports.list = (req, res) => {
    const news = News.filter(req.query.category);

    res.render('news', news);
};
