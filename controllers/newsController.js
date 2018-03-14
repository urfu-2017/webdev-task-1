'use strict';
const defaultCountry = 'us';
const NewsModel = require('../models/newsModel');

module.exports = async function renderNews(req) {
    const news = new NewsModel(req.query.country || defaultCountry, req.params.category);
    const newsData = await news.get();

    return newsData;
};
