'use strict';

const { index, newsCategory } = require('./controllers/news');

module.exports = app => {
    app.get('/', index);

    app.get('/news/:category', newsCategory);
};
