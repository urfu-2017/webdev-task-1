'use strict';

const { getNews } = require('./controllers/news');
const { getCategories } = require('./controllers/categories');

module.exports = app => {
    app.get('/', getCategories);
    app.get('/news/general', getNews);
    app.get('/news/business', getNews);
    app.get('/news/entertainment', getNews);
    app.get('/news/health', getNews);
    app.get('/news/science', getNews);
    app.get('/news/sport', getNews);
    app.get('/news/tech', getNews);
};

