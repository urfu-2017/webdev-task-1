'use strict';

const { error404 } = require('./controllers/errors');
const { list } = require('./controllers/category');
const { main } = require('./controllers/index');

module.exports = app => {
    app.get('/', main);
    app.get('/:category', list);

    app.all('*', error404);
};
