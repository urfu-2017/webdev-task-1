/* eslint-disable no-unused-vars */
'use strict';

module.exports = (err, req, res, next) => {
    res.render('error', { err: err.stack });
};
