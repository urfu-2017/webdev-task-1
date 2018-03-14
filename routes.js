'use strict';

const { main } = require('./controllers/main');
const { findAll } = require('./controllers/news');


module.exports = app => {
    app.get('/', main);
    app.get('/:category', findAll);
};
