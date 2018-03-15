'use strict';

const { index } = require('./controllers/index');
const { list } = require('./controllers/news');
const { error404 } = require('./controllers/errors');

module.exports = app => {
    app.get('/', index);
    app.get('/news/:category', list);
    app.all('*', error404);
};
