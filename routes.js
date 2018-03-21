'use strict';

const { info, news } = require('./controllers/info');
const { error404 } = require('./controllers/error');

module.exports = app => {
    app.get('/', info);

    app.get('/news/:category([a-z]+)', news);

    app.all('*', error404);
};
