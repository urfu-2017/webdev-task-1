'use strict';
const config = require('../../config');


module.exports = (req, res, next) => {
    res.locals.meta = {
        charset: 'utf-8',
        description: 'Local news and weather'
    };
    res.locals.title = 'Название';
    res.locals.year = new Date().getFullYear();
    res.locals.staticBasePath = config.staticBasePath;

    next();
};
