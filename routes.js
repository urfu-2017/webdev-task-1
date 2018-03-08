'use strict';

const { error404 } = require('./controllers/errors');
const { news, category } = require('./controllers/news');
const categories = require('./common/categories.json');

const categoriesPattern = categories.map(c => c.id).join('|');
module.exports = app => {
    app.get(['/', '/news'], news);
    app.get(`/news/:category(${categoriesPattern})`, category);
    app.all('*', error404);
};
