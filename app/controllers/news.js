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
        res.locals['nonMain'] = true;
        res.render('news', { widget, articles, ...res.locals })
    }).catch(err => res.sendStatus(404));

};
