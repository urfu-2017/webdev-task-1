'use strict';

const { getNews } = require('./controllers/news');
const { getCategories } = require('./controllers/categories');

module.exports = app => {
    app.get('/', getCategories);
    app.get('/news/:category', getNews);
};

