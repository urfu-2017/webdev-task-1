'use strict';

const news = require('./app/controllers/news');
const { main } = require('./app/controllers/main');

module.exports = app => {
    app.get('/', main);
    app.get('/news/:category', news.findList);
};
