'use strict';

const { error404 } = require('./controllers/errors');
const { home } = require('./controllers/main');
const { listNews } = require('./controllers/news');

module.exports = app => {
    app.get('/', home);

    app.get('/news/:category', listNews);

    app.all('*', error404);
};
