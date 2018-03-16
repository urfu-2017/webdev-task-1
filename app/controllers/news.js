'use strict';

const News = require('../models/news');
const Weather = require('../models/weather');

exports.list = (req, res) => {
    const country = req.query.country ? req.query.country : 'ru';
    const category = req.params.category ? req.params.category : 'all';
    const query = req.query.query ? req.query.query : 'miami';

    Promise.all([
        News.find(country, req.params.category),
        Weather.find(query)
    ])
        .then(result => {
            res.setHeader('content-type', 'text/html');
            res.render('news', {
                news: result[0].articles,
                country: country,
                category: category,
                weather: result[1]
            });
        });
};
