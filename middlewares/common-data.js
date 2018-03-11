'use strict';

module.exports = (req, res, next) => {
    res.locals.meta = {
        charset: 'utf-8',
        description: 'News and Weather Service'
    };

    res.locals.title = 'News and Weather Service';

    res.locals.defaultCountry = 'ru';
    res.locals.defaultLanguage = 'ru';
    res.locals.homePage = '/';

    next();
};
