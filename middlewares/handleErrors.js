'use strict';

module.exports = (err, req, res, next) => {
    console.error(err.stack);

    res.sendStatus(500);
    next();
};
