'use strict';

const { error404 } = require('./controllers/errors');
const { categories, news } = require('./controllers/data');

module.exports = app => {
    app.get('/', categories);
    app.get('/:category', news);


    app.all('*', error404);
};
