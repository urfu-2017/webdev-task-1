'use strict';

const { renderMain, renderNews } = require('./controllers/index');

module.exports = (app) => {
    app.get('/', renderMain);
    app.get('/:category', renderNews);
};
