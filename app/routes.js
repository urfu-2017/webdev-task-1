'use strict';
const { index, newsCategory } = require('./controllers/main');
const { error404 } = require('./controllers/errors');


module.exports = app => {
    app.get('/', index);
    app.get('/:category', newsCategory);

    app.all('*', error404);
};
