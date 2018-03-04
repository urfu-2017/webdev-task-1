'use strict';

const { forecast } = require('./controllers/weather');
const { list } = require('./controllers/news');

module.exports = app => {
    app.get('/', forecast);
    app.get('/news', list);
};

