'use strict';

const { index, news } = require('./controllers/getData');

module.exports = app => {
    app.get('/', index);
    app.get('/:name', news);
};
