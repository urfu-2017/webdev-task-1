'use strict';

const Weather = require('../models/weather');
const News = require('../models/news');

exports.listNews = (req, res) => {
    const { query, lat, lon, country } = req.query;
    const { category } = req.params;
    const _weather = new Weather({ query, lat, lon });
    const _news = new News({ country, category }, res.locals.main);
    Promise.all([
        _weather.get(),
        _news.get()
    ])
        .then(([weather, news])=> {
            res.locals.isWeatherLoaded = true;
            if (!weather) {
                res.locals.isWeatherLoaded = false;
            } else {
                res.locals.weather = weather.weatherList;
                res.locals.city = weather.city;
            }
            res.locals.news = news;
            res.locals.query = req.url.split('/')[3];

            if (news) {
                res.render('index', res.locals);
            } else {
                res.sendStatus(404);
            }
        });
};
