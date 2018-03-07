'use strict';

const config = require('config');

module.exports = (req, res, next) => {
    res.locals.meta = {
        charset: 'utf-8',
        description: 'Weather'
    };

    res.locals.title = 'Weather';

    res.locals.staticBasePath = '//';

    res.locals.weatherApiBasePath = 'https://www.metaweather.com/';

    next();
};
