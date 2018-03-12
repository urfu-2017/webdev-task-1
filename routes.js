'use strict';

const main = require('./controllers/baseController');
const news = require('./controllers/newsController');

module.exports = (app) => {
    app.get('/', main);
    app.get('/:category', news);
};
