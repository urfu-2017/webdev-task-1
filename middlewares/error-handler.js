'use strict';

exports.handleError = (err, req, res) => {
    console.error(err.stack);
    res.sendStatus(500);
};
