'use strict';

const News = require('../models/news');

exports.news = async (req, res) => {
    const locals = res.locals;
    const weather = res.weather;

    const country = req.query.country || 'us';
    const category = req.params.category;
    const key = process.env.KEY;

    const news = await News.getNewsData(country, category, key);

    const data = { weather, news, locals };

    res.render('news_category', data);
};
