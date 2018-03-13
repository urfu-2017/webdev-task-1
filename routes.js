'use strict';

const { error404 } = require('./controllers/errors');
const { news } = require('./controllers/news');
const { categories } = require('./controllers/categories');

module.exports = app => {
    app.get('/', categories);
    app.get('/:category', news);
    app.all('*', error404);
};
