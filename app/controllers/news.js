'use strict';

const Article = require('../models/article');
const Widget = require('../models/widget');

exports.news = (req, res) => {
    Promise.all([
        Widget.build(req.query.query),
        Article.getArticles(req.query.country, req.query.category)
    ]).then(vals => {
        const widget = vals[0];
        const articles = vals[1];
        res.locals.nonMain = true;
        const data = Object.assign({ widget, articles }, res.locals);
        res.render('news', data);
    })
        .catch(err => {
            res.redirect('error', err);
        });

};
