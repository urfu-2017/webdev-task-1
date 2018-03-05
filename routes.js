'use strict'

const { error404 } = require('./controllers/errors');
const { create, list } = require('./controllers/categories');
const { newsList } = require('./controllers/news');

module.exports = app => {
    app.get('/', list);

    app.get('/:name', newsList);

    app.all('*', error404);
}