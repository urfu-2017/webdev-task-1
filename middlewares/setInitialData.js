'use strict';
const indexJson = require('../mocks/index.json');

module.exports = (req, res, next) => {
    res.locals.title = indexJson.title;
    res.locals.meta = indexJson.meta;
    res.locals.main = indexJson.main;

    next();
};
