'use strict';

module.exports = (app, controller) => {
    app.get('/:category', controller.category);
    app.get('/', controller.main);
};
