'use strict';

const { findCategoryName } = require('../../utils');
const { categories } = require('../../data.json');

const Weather = require('../../models/weather');
const News = require('../../models/news');

module.exports = (req, res) => {
    const category = findCategoryName(categories, req.params.category);
    Weather.find(req.query)
        .then(weather => News.find(req.query.country, req.params.category)
            .then(news => res.render('category', { weather, news, category })));
};
