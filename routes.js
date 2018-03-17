'use strict';

const { error404 } = require('./controllers/errors');
const { news, categories } = require('./controllers/news');

module.exports = app => {
    app.get('/', categories);
    app
        .get('/categories/', categories);

    app.get('/news/:category/', news);
    app.all('*', error404);
};
