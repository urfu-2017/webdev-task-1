'use strict';

const { error404 } = require('./controllers/errors');
<<<<<<< HEAD
const { home } = require('./controllers/main');
const { listNews } = require('./controllers/news');
=======
const { home, listNews } = require('./controllers/options');
>>>>>>> a2fefc59ae1d93e7c33b0d9143af6f5deeaedd54

module.exports = app => {
    app.get('/', home);

    app.get('/news/:name', listNews);

    app.all('*', error404);
};
