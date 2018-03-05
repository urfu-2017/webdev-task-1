'use strict';

const { categories } = require('../../data.json');

const Weather = require('../../models/weather');

module.exports = (req, res) => {
    const query = req.url.slice(1);
    Weather.find(req.query)
        .then(weather => res.render('main', { categories, weather, query }));
};
