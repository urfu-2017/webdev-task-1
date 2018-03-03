'use strict';

const news = require('./news');
const { error404 } = require('../controllers/errors');
const categories = require('../mocks/categories.json').categories;
const supported = categories.map(({ url }) => url.split('/').pop());

let getCatName = category => categories.find(cat => cat.url.split('/').pop() === category).name;

exports.list = (req, res) => {
    res.render('index', { categories });
};

exports.get = function (req, res) {
    let category = req.params.category;
    let country = req.query.country || 'ru';
    if (!supported.includes(category)) {
        error404(req, res);

        return;
    }
    news.getList({
        country,
        category
    }, (newsList) => {
        res.render('category', {
            newsList,
            catName: getCatName(category)
        });
    });
};
