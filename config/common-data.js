'use strict';

module.exports = (req, res, next) => {
    const categories = ['business', 'entertainment', 'general', 'health',
        'science', 'sports', 'technology'];
    res.locals.categories = categories;

    next();
};
