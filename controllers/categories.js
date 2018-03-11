'use strict';

const news = require('./news');

const { error404 } = require('../controllers/errors');
const categories = require('../mocks/categories');
const supported = categories.map(({ url }) => url.split('/').pop());

exports.list = (req, res) => {
    res.render('partials/includes/index', { categories });
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

    let catName = categories.find((categoryObj, i) => supported[i] === category).name;

    news.getList(options)
        .then(newsList => {
            res.render('partials/includes/category', {
                newsList,
                catName: `Новости: ${catName}`
            });
        })
        .catch(err => console.error(err));
};
