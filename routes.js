'use strict';

const { error404 } = require('./controllers/errors');
const { news, categories } = require('./controllers/news');

module.exports = app => {
    app.get('/', categories);

    // Можем объединить разные http методы с одинаковым маршрутом
    app
        .route('/categories/')
        .get(categories)

    app.get('/news/:category/', news);

    // Если роутер не выбрал подходящий для запроса маршрут – используется этот
    app.all('*', error404);
};
