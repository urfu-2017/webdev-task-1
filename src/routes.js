'use strict';

const { error404 } = require('./controllers/errors');
const { list: newsCategoriesList } = require('./controllers/news-categories');
const { list: newsList } = require('./controllers/news');

module.exports = app => {
    app.get('/', newsCategoriesList);
    app.get('/news', newsList);

    app.all('*', error404);
};
