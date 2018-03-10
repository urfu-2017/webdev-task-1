'use strict';

const { News } = require('../models/news');
const { meta } = require('../utils/meta');
const url = require('url');
const qs = require('querystring');

exports.renderNews = (req, res) => {
    const category = req.params.category;
    const parsedUrl = url.parse(req.url);
    const query = qs.parse(parsedUrl.query);
    const country = query.country || 'ru';
    News.getNews(category, country)
        .then(data => {
            res.render('news', { articles: data, meta, ...res.locals });
        });
};
