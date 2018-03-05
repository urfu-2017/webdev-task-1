'use strict';

const { list: newsCategoriesList } = require('./controllers/news-categories');
const { list: newsList } = require('./controllers/news');

module.exports = app => {
    app.get('/', newsCategoriesList);
    app.get('/news', newsList);
};
