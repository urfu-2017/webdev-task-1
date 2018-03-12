'use strict';
const Weather = require('../models/weather');
const Header = require('../models/header');
const Categories = require('../models/categories');
const Articles = require('../models/article');

exports.categories = (req, res) => {
    Weather.getAsync(req.query).then(weather =>
        res.render('categories', {
            header: Header.build(req.params),
            weather,
            categories: Categories.build()
        })
    );

};

exports.articles = (req, res, next) => {
    if (!Categories.exists(req.params.category)) {
        return next();
    }
    Articles.getAsync(req.params.category, req.query)
        .then(articles => {
            Weather.getAsync(req.query).then(weather =>
                res.render('articles', {
                    header: Header.build(req.params),
                    weather,
                    articles
                })
            );
        });

};

