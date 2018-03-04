'use strict';

const config = require('config');

module.exports = (req, res, next) => {
    // Хранение в res.locals – рекомендованный способ
    // Не перезаписываем, а дополняем объект
    res.locals.meta = {
        charset: 'utf-8',
        description: 'Weather'
    };

    res.locals.title = 'Weather';

    res.locals.staticBasePath = config.get('staticBasePath');

    res.locals.weatherApiBasePath = 'https://www.metaweather.com/';

    next();
};
