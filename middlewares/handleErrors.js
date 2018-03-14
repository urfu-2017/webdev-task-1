/* eslint-disable no-unused-vars */
'use strict';

const config = require('../config');

module.exports = (err, req, res, next) => {
    const port = config.port || 8080;

    res.render('error', { err: err.stack, port });
};
