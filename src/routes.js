'use strict';

const { list: categoriesList } = require('./controllers/categories');
const { list: newsList } = require('./controllers/news');
const { wrapAsync } = require('./utils/async-wrapper');
const { NotFound } = require('./utils/exceptions');

module.exports = app => {
    app.get('/', wrapAsync(categoriesList));
    app.get('/:category', wrapAsync(newsList));
    app.all('*', () => {
        throw new NotFound('Страница не найдена');
    });
};
