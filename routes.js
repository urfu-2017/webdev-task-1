'use strict'

const { error404 } = require('./controllers/errors');
const { create, list } = require('./controllers/categories');
const { newsList } = require('./controllers/news');

module.exports = app => {
    app.get('/', list);
    // app
    //     .route('/notes')
    //     .get(list)
    //     .post(create)

    app.get('/categories/:name', newsList);

    app.all('*', error404);
}