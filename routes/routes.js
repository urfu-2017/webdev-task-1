'use strict';

const error404 = require('../controllers/errors');
const { startPage, item } = require('../controllers/news');

module.exports = function (app) {
    app.get('/', startPage);

    app.get('/:name', item);

    app.all('*', error404);
};
