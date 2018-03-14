'use strict';

const { News } = require('../models/news');
const { Category } = require('../models/category');


module.exports.handleNewsPage = async (req, res, next) => {
    if (!Category.findByName(req.params.category)) {
        next();

        return;
    }
    req.locals.pageName = 'news';
    req.locals.news = await News.fetch({
        country: req.query.country, category: req.params.category
    });
    req.locals.weather = await req.locals.weather;

    res.render('news', req.locals);
};
