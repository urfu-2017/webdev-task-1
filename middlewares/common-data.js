'use strict';

module.exports = (req, res, next) => {
    res.locals.meta = {
        charset: 'utf-8',
        description: 'News and Weather Service'
    };

    res.locals.title = 'News and Weather Service';


    next();
};
