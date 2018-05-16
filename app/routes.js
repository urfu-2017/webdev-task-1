'use strict';

const controller = require('./controllers/index');
const errors = require('./controllers/errors');

module.exports = app => {
    app
        .get('/', controller.indexPage)
        .get('/:category([a-z]+)', controller.newsPage)
        .all('*', errors.error404);
};
