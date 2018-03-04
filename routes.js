'use strict';

const { error404 } = require('./controllers/errors');
const { categories, publications } = require('./controllers/publications');

module.exports = app => {
    app.get('/', categories);
    app.get('/:category', publications);


    app.all('*', error404);
};
