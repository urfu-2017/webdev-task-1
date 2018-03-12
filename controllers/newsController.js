'use strict';

const News = require('../models/newsModel');
const Weather = require('../models/weatherModel');
const document = require('../data.json');
const queryString = require('query-string');

module.exports = ({ query, params }, res) => {
    const newsController = new News(query, params);
    const weatherController = new Weather(query);

    Promise.all([
        newsController.getNews(),
        weatherController.getWeather()
    ]).then(([news, weather]) => {
        res.render('articles', {
            weather,
            news,
            document,
            query: queryString.stringify(query),
            homeLink: 'true'
        });
    });
};
