'use strict';

const News = require('../models/news');

exports.list = (req, res) => {
    const country = req.query.country ? req.query.country : 'ru';
    const category = req.query.category ? req.query.category : 'business';

    News.find(country, category)
        .then((result) => {
            res.setHeader('content-type', 'text/html');
            console.info(result);
            res.render('news', {
                news: result.articles,
                country: req.query.country
            });
        });
};
