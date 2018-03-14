'use strict';

const { category } = require('../../config');

module.exports = (req, res, next) => {
    res.locals.category = category;
    next();
};
