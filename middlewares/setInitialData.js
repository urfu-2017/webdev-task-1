'use strict';

const config = require('../config.json');


module.exports.setInitialData = (req, res, next) => {
    req.locals = {};
    req.locals.metaData = { title: config.title, categories: config.categories };
    next();
};
