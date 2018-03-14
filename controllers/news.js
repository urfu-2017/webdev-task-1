'use strict';

const News = require('../models/news');
const Category = require('../models/category');


module.exports.findAll = async (req, res, next) => {
    if (!Category.findByName(req.params.category)) {
        next();

        return;
    }
    req.locals.pageName = 'news';
    req.locals.news = await News.fetch({
        country: req.query.country, category: req.params.category
    });

    res.render('news', req.locals);
};
