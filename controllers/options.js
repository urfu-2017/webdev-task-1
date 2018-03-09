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
    ])
        .then(answer => {
            const data = res.locals;
            if (!answer[0]) {
                data.answer = 'Not found';
            } else {
                data.weathers = answer[0].weathers;
                data.city = answer[0].city;
            }
            data.news = answer[1];
            data.query = parseUrl.search;

            if (answer[1]) {
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
            data.query = parseUrl.search;
            if (!treatmentError(res, 'index', answer, data)) {

                return;
            }
            data.weathers = answer.weathers;
            data.city = answer.city;
            res.render('index', data);
        });
};

function treatmentError(res, file, answer, data) {
    if (!answer) {
        data = res.locals;
        data.answer = 'Not found';
        res.render(file, data);

        return false;
    }

    return true;
}
