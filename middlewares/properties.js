'use strict';

const { view } = require('../config');

module.exports = (req, res, next) => {
    res.locals.properties = view;
    next();
};
