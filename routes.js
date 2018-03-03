'use strict';

const { error404 } = require('./controllers/errors');
const { weather } = require('./controllers/weather');

module.exports = app => {
    app.get('/', weather);

    app
        .route('/weather')
        .get(weather)

    // Если роутер не выбрал подходящий для запроса маршрут – используется этот
    app.all('*', error404);
};
