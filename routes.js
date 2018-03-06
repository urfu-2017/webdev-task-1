'use strict';

const { error404 } = require('./controllers/errors');
const { weather } = require('./controllers/weather');
const { news } = require('./controllers/news');

module.exports = app => {
    app.get('/', error404);

    app
        .route('/weather')
        .get(weather);

    app
        .route('/news')
        .get(news);

    app.all('*', error404);
}
