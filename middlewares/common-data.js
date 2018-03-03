'use strict';

module.exports = (req, res, next) => {
    res.locals.meta = {
        charset: 'utf-8'
    };

    res.locals.siteName = 'Newster';
    res.locals.staticBasePath = '/static/';

    next();
};
