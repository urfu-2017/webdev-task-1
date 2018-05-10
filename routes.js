'use strict';

const { newsList, categoriesList } = require('./controllers/index');

module.exports = app => {
    app.get('/', categoriesList);
    app.get('/:category', newsList);
};
