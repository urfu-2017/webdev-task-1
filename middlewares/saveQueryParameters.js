'use strict';

const queryString = require('querystring');


module.exports.saveQueryParameters = (req, res, next) => {
    req.locals.query = queryString.stringify(req.query);

    next();
};
