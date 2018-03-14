'use strict';

const { handleMainPage } = require('./controllers/main');
const { handleNewsPage } = require('./controllers/news');


module.exports = app => {
    app.get('/', handleMainPage);
    app.get('/:category', handleNewsPage);
};
