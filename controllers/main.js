'use strict';

// const url = require('url');

const Weather = require('../models/weather');

exports.home = (req, res) => {
    const { query, lat, lon } = req.query;
    const _weather = new Weather({ query, lat, lon });
    _weather.get()
        .then(weather => {
            res.locals.query = req.url;
            res.locals.isWeatherLoaded = true;
            if (!weather) {
                res.locals.isWeatherLoaded = false;

                return res.render('index', res.locals);
            }
            res.locals.weather = weather.weatherList;
            res.locals.city = weather.city;
            res.render('index', res.locals);
        });
};
