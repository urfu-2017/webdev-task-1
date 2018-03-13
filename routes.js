'use strict';

const config = require('./config/default');

const { error404 } = require('./controllers/errors');
const { news, category } = require('./controllers/news');

const categoriesPattern = config.categories.map(c => c.id).join('|');

module.exports = app => {
    app.get(['/', '/news'], news);
    app.get(`/news/:category(${categoriesPattern})`, category);
    app.all('*', error404);
};
