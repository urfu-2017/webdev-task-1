'use strict';

const { error404 } = require('./controllers/errors');
const { listCategories } = require('./controllers/categories');
const { listNews } = require('./controllers/news');

module.exports = app => {
    app.get('/', listCategories);

    app.get('/categories', listCategories);
    app.get('/categories/:name', listNews);

    app.all('*', error404);
};
