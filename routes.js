'use strict';

const { list } = require('./controllers/categories');
const { news } = require('./controllers/news');
const { error404 } = require('./controllers/errors');

module.exports = app => {
    app.get('/', list);

    app
        .route('/news')
        .get(list);

    app.get('/news/:category', news);

    app.all('*', error404);
};
