'use strict';

const news = require('../parsers/newsParser');

exports.renderNews = async (req, res) => {
    let newsArticles = await news.getNews(req);
    let container = {};
    Object.assign(container, req.weather);
    Object.assign(container, newsArticles);
    res.render('news', container);
};
