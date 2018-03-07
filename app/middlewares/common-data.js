'use strict';
const config = require('../../config');


module.exports = (req, res, next) => {
    res.locals.language = config.language;
    res.locals.meta = config.meta;
    res.locals.title = config.title;
    res.locals.year = new Date().getFullYear();
    res.locals.staticBasePath = config.staticBasePath;

    next();
};
