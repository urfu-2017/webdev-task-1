'use strict';
const indexJson = require('../mocks/index.json');

module.exports = (req, res, next) => {
    const data = indexJson[0];
    res.locals.title = data.title;
    res.locals.meta = data.meta;
    res.locals.main = data.main;

    next();
};
