'use strict';

const { weather } = require('./controllers/main');
const { error404 } = require('./controllers/errors');

module.exports = app => {
    app.get('/', weather);

    app.all('*', error404);
};
