'use strict';

const News = require('../models/news');

exports.renderNews = async (req, res) => {
    let news = await News.getNews(req);
    let container = {};
    Object.assign(container, req.weather);
    Object.assign(container, { news });
    res.render('news', container);
};
