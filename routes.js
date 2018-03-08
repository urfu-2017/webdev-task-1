'use strict';

const { main } = require('./controllers/main');
const { news } = require('./controllers/news');
const { error404 } = require('./controllers/errors');
const { newsCategories } = require('./config/default.json');

module.exports = app => {
    const newsCategoriesRegexp = newsCategories
        .map(category => category.originalName)
        .join('|');

    app.get('/', main);
    app.get(`/news/:category(${newsCategoriesRegexp})`, news);
    app.all('*', error404);
};
