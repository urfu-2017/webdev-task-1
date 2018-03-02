'use strict';

const cats = require('./controllers/categories');
const { error404 } = require('./controllers/errors');

exports.routes = app => {
    app.get('/', cats.list);

    app.get('/news/:category', cats.get);

    app.all('*', error404);
};
