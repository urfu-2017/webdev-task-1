'use strict';

const { mainPage } = require('./controllers/main');
const { news } = require('./controllers/news');
const { error404 } = require('./controllers/errors');

module.exports = app => {
    app.get('/', mainPage);

    app.get('/news', news);

    app.all('*', error404);
};
