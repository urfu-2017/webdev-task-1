'use strict';

const { error404 } = require('./controllers/errors');
const { renderMain } = require('./controllers/home');
const { renderNews } = require('./controllers/news');

module.exports = app => {
    app.get('/', renderMain);

    app.get('/news/:category', renderNews);

    app.all('*', error404);
};
