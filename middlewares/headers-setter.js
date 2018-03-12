'use strict';

const info = require('../mocks/info');

exports.setHeaders = (req, res, next) => {
    res.locals.meta = info.meta;
    res.locals.title = info.title;
    res.locals.header = info.header;
    next();
};
