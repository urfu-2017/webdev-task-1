'use strict';
const { error404 } = require('./controllers/errors');
const { list, news } = require('./controllers/all');


module.exports = app => {
    app.get('/', list);

    app.get('/news/:name', news);

    app.all('*', error404);
};
