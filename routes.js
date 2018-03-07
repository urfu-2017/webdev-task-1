'use strict';

const { error404 } = require('./controllers/errors');
const { listCathegories, listNews } = require('./controllers/cathegories');

module.exports = app => {
    app.get('/', listCathegories);

    // Можем объединить разные http методы с одинаковым маршрутом
    app.get('/cathegories', listCathegories);
    app.get('/cathegories/:name', listNews);

    // Если роутер не выбрал подходящий для запроса маршрут – используется этот
    app.all('*', error404);
};
