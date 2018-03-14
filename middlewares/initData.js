'use strict';

const initData = require('../content/initData.json');

exports.loader = (req, res, next) => {
    res.locals = Object.assign({}, initData, res.locals);
    next();
};
