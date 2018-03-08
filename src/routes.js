'use strict';

const { error404 } = require('./controllers/errors');
const { list: categoriesList } = require('./controllers/categories');
const { list: newsList } = require('./controllers/news');

module.exports = app => {
    app.get('/', categoriesList);
    app.get('/:category', newsList);

    app.all('*', error404);
};
