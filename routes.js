'use strict';

const { error404 } = require('./controllers/errors');
const { home, listNews } = require('./controllers/options');

module.exports = app => {
    app.get('/', home);

    app.get('/news/:name', listNews);

    app.all('*', error404);
};
