'use strict';

const { error404 } = require('./controllers/errors');
const { list } = require('./controllers/publications');

module.exports = app => {
    app.get('/', list);


    app.all('*', error404);
};
