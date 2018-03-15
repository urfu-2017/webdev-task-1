'use strict';

const { index } = require('./controllers/index');
const { list } = require('./controllers/news');
const { error404 } = require('./controllers/errors');

module.exports = app => {
    app
        .get('/', index)
        .get('/news/:category', list)
        .all('*', error404);
};
