'use strict';

const url = require('url');

const Weather = require('../models/weather');
const News = require('../models/news');

exports.listNews = (req, res) => {
    let parseUrl = url.parse(req.url, true);
    const weather = new Weather(parseUrl.query);
    const news = new News(parseUrl);
    Promise.all([
        weather.getWeather(),
        news.getNews(res.locals)
    ]).then(answer => {
        const data = res.locals;
        data.weathers = answer[0].weathers;
        data.city = answer[0].city;
        data.news = answer[1];
        data.query = parseUrl.search;

        if (answer) {
            res.render('news', data);
        } else {
            res.sendStatus(404);
        }
    });
};

exports.home = (req, res) => {
    let parseUrl = url.parse(req.url, true);
    const weather = new Weather(parseUrl.query ? parseUrl.query : '');
    weather.getWeather()
        .then(answer => {
            const data = res.locals;
            data.weathers = answer.weathers;
            data.city = answer.city;
            data.query = parseUrl.search;

            if (answer) {
                res.render('index', data);
            } else {
                res.sendStatus(404);
            }
        });
};
