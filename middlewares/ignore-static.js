'use strict';

const staticRegex = /\.(html|css|ico|png|jpg|svg|gif)$/;

module.exports = middleware => (req, res, next) => {
    if (!staticRegex.test(req.path)) {
        return middleware(req, res, next);
    }

    return next();
};
