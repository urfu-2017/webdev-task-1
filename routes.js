'use strict';

const { error404 } = require('./controllers/errors');
const { categories, articles } = require('./controllers/articles');

module.exports = app => {
    app.get('/', categories);
    app.get('/:category', articles);


    app.all('*', error404);
};
