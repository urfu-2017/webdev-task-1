'use strict';

const { error404 } = require('../controllers/errors');
const { newsList, categories } = require('../controllers/news');

module.exports = app => {
    app.get('/', categories);

    app.get('/:category', newsList);

    app.all('*', error404);
};
