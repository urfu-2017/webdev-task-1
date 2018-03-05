'use strict';

const News = require('../models/news');
const Weather = require('../models/weather');

exports.newspage = (req, res) => {
    let query = req.query.query ? req.query.query : 'moscow';
    let country = req.query.country ? req.query.country : 'ru';
    const prognoz = Weather.prognoz(query);
    const news = News.find(req.params.category, country);
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
