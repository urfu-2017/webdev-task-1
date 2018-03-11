'use strict';

const { error404 } = require('./controllers/errors');

const { newsList, categoriesList } = require('./controllers/index');

module.exports = app => {
    app.get('/', categoriesList);
    app.get('/:category', newsList);
    app.all('*', error404);
};
