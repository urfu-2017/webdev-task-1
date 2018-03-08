'use strict';

const { error404 } = require('./controllers/errors');
const { news } = require('./controllers/news');
const { home } = require('./controllers/home');

module.exports = app => {
    app.get('/', home);

    app
        .route('/news')
        .get(news);

    app.all('*', error404);
}
