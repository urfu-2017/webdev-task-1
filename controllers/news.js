'use strict';

const models = require('../models/news');
const data = require('../data');

exports.index = async (req, res) => {
    if (!Object.keys(data.categories).find(c => c === req.params.category)) {
        res.status(404);

        return;
    }
    let apiResponse = await models.NewsManager.findByCategory(req.params.category);
    res.render('news', {
        title: data.categories[req.params.category].title,
        weatherData: req.weatherData,
        articles: apiResponse.articles,
        dateOptions: {
            lang: 'ru'
        }
    });
};
