'use strict';

const { categories, articles } = require('./controllers/articles');

module.exports = function (app) {
    app.get('/', categories);
    app.get('/articles/:category', articles);
};
