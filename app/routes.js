'use strict';

const { error404 } = require('./controllers/errors');
const { start } = require('./controllers/weather');
const { list } = require('./controllers/news');

module.exports = app => {
    app.get('/', start);
    app.get('/news', list);

    app.all('*', error404);
};
