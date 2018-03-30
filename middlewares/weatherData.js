'use strict';
const { getWeather } = require('../middlewares/getweather');

exports.weatherData = (req, res, next) => {
    let weather = getWeather(req.query);
    res.locals.meta = {
        charset: 'utf-8',
        description: 'Погодаааа'
    };

    res.locals.title = 'Погодаааа';
    res.locals.weather = {
        today: weather[0],
        forecast: weather.slice(0, 5)
    };
    next();
};
