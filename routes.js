'use strict';

const { index } = require('./controllers/index');
const { list } = require('./controllers/news');

module.exports = app => {
    app.get('/', index);
    app.get('/news/:category', list);
};

