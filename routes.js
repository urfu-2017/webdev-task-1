'use strict';

const { home } = require('./controllers/home');
const { news } = require('./controllers/news');
const { error404 } = require('./controllers/errors');

module.exports = app => {
    app.get('/', home);
    app.get('/:category', news);
    app.all('*', error404);
};
