'use strict';

module.exports = (req, res, next) => {
    res.locals.defaultCountry = 'ru';
    res.locals.defaultLanguage = 'ru';
    res.locals.homePage = '/';

    next();
};
