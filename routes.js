'use strict';

const { error404 } = require('./controllers/errors');
const { main, news } = require('./controllers/main');

module.exports = app => {
    app.get('/', main);
    app.get('/news/:category', news);

    app.all('*', error404);
};
