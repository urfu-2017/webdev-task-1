'use strict';

const { error404 } = require('./controllers/errors');
const { listCategories, listNews } = require('./controllers/categories');

module.exports = app => {
    app.get('/', listCategories);

    // Можем объединить разные http методы с одинаковым маршрутом
    app.get('/categories', listCategories);
    app.get('/categories/:name', listNews);

    // Если роутер не выбрал подходящий для запроса маршрут – используется этот
    app.all('*', error404);
};
