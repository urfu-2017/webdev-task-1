'use strict';

const { main, news } = require('./controllers/controller');

module.exports = app => {
    app.get('/news/:topic', news);
    app.get('/', main);
};
