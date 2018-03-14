'use strict';

const { error404 } = require('./controllers/errors');
const { list } = require('./controllers/categories');
const { getList } = require('./controllers/news');

module.exports = app => {
    app.get('/', list);

    app.get('/:name', getList);

    app.all('*', error404);
};
