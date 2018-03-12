'use strict';

const Article = require('../models/article');
const Widget = require('../models/widget');

exports.news = (req, res) => {
    Promise.all([
        Widget.get(req.query.query),
        Article.get(req.query.country, req.query.category)
    ]).then(vals => {
        const widget = vals[0];
        const articles = vals[1];
        res.locals.nonMain = true;
        const data = Object.assign({ widget, articles }, res.locals, { title: 'Погода' });
        res.render('news', data);
    })
        .catch(err => {
            res.redirect('error', err);
        });

};
