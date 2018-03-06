'use strict';

const { error404 } = require('./controllers/errors');

const { list } = require('./controllers/index');

module.exports = app => {
    app.get('/', list)
    // app.get('/categories/:country', list);
    app.all('*', error404);
};
// 