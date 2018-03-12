'use strict';

const Widget = require('../models/widget');
const Category = require('../models/category');

exports.mainPage = (req, res) => {
    Promise.all([
        Widget.build(req.query.query),
        Category.getCategories(req.query.country)
    ]).then(vals => {
        const widget = vals[0];
        const categories = vals[1];
        const data = Object.assign({ widget, categories }, res.locals, { title: 'Погода' });
        res.render('index', data);
    })
        .catch(err => {
            res.redirect('error', err);
        });
};
