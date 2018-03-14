'use strict';

const { error404 } = require('./controllers/errors');
const { home, showNewsForTopic } = require('./controllers/news');

module.exports = app => {
    app.get('/', home);
    app.get('/:name', showNewsForTopic);
    app.all('*', error404);
};
