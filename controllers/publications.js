'use strict';
const Weather = require('../models/weather');
const Header = require('../models/header');
const Categories = require('../models/categories');
const Publications = require('../models/publications');

exports.categories = (req, res) => {
    Weather.getAsync(req.query).then(weather =>
        res.render('categories', {
            header: Header.build(req.params),
            weather,
            categories: Categories.build()
        })
    );

};

exports.publications = (req, res, next) => {
    if (!Categories.exists(req.params.category)) {
        return next();
    }
    Publications.getAsync(req.params.category, req.query)
        .then(publications => {
            Weather.getAsync(req.query).then(weather =>
                res.render('publications', {
                    header: Header.build(req.params),
                    weather,
                    publications
                })
            );
        });

};

