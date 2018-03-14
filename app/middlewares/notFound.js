'use strict';

module.exports = app => {
    app.all('*', (req, res, next) => {
        next(new Error('PAGE_NOT_FOUND'));
    });
};
