'use strict';

const { error404 } = require('../controllers/errors');
const { newsList } = require('../controllers/news');
const { categories } = require('../controllers/categories');

module.exports = app => {
    app.get('/', categories);

    app.get('/:category', newsList);

    app.all('*', error404);
};
