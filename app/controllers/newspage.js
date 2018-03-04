'use strict';

const News = require('../models/news');
const Weather = require('../models/weather');

exports.newspage = (req, res) => {
    const prognoz = Weather.prognoz(req.query.query);
    const news = News.find(req.params.category, req.query.country);
    prognoz.then((weather)=> {
        news.then((allNews) => {
            res.setHeader('content-type', 'text/html');
            res.render('news', {
                title: 'News about ' + req.params.category,
                weather: weather,
                news: allNews.articles,
                city: req.query.query,
                country: req.query.country
            });
        });
    });
};
