'use strict';

const config = require('config');

const { main } = require('./controllers/main');
const { news } = require('./controllers/news');
const { error404 } = require('./controllers/errors');

module.exports = app => {
    const newsCategoriesRegexp = config.get('newsCategories')
        .map(category => category.originalName)
        .join('|');

    app.get('/', main);
    app.get(`/news/:category(${newsCategoriesRegexp})`, news);
    app.all('*', error404);
};
