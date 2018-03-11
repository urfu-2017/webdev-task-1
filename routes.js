'use strict';

const categories = require('./controllers/categories');
const { error404 } = require('./controllers/errors');

exports.routes = app => {
    app.get('/', categories.list);

    app.get('/news/:category', categories.get);

    app.all('*', error404);
};
