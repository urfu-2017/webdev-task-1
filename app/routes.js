'use strict';

const { error404 } = require('./controllers/errors');
const { start } = require('./controllers/home');
const { list } = require('./controllers/news');

module.exports = app => {
    app
        .route('/')
        .get(start);

    app
        .route('/news/:category')
        .get(list);

    app.all('*', error404);
};
