'use strict';

const controllers = require('./controllers/pages');


module.exports = app => {
    app.get('/', controllers.renderMainPage);
    app.get('/:category', controllers.renderNewsPage);
    app.all('*', controllers.error404);
};
