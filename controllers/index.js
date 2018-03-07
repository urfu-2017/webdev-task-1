'use strict';

const weatherController = require('./weather');
const newsController = require('./news');

const document = require('../data.json');

module.exports.renderMain = (req, res) => {
    const query = Object.entries(req.query)
        .reduce((prev, cur) => {
            return `${prev}${cur[0]}=${cur[1]}&`;
        }, '?');

    return weatherController(req.query).then(weather => {
        res.render('main', {
            document,
            weather,
            query
        });
    });
};

module.exports.renderNews = (req, res) => {
    const query = Object.entries(req.query)
        .reduce((prev, cur) => {
            return `${prev}${cur[0]}=${cur[1]}&`;
        }, '?');

    return Promise.all([
        weatherController(req.query),
        newsController(req.query.country, req.params.category)
    ]).then(([weather, news]) => {
        res.render('newsMain', {
            weather,
            news,
            document,
            query
        });
    })
        .catch(console.error);
};
