'use strict';

const { error404 } = require('./controllers/errors');
const { main } = require('./controllers/main');
const { news } = require('./controllers/news');

module.exports = app => {
    app.get('/', main);
    app.get('/news/:category', news);

    app.all('*', error404);
};
