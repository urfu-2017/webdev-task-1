'use strict';

const news = require('./news');

const { error404 } = require('../controllers/errors');
const categories = require('../mocks/categories');
const supported = categories.map(({ url }) => url.split('/').pop());

exports.list = (req, res) => {
    res.render('index', { categories });
};

exports.get = (req, res) => {
    let category = req.params.category;
    let country = req.query.country || 'ru';
    if (!supported.includes(category)) {
        error404(req, res);

        return;
    }

    let options = {
        country,
        category
    };

    news.getList(options)
        .then(newsList => {
            res.render('category', {
                newsList,
                catName: category
            });
        })
        .catch(err => console.error(err));
};
