'use strict';

const config = require('config');

const { getWeather } = require('../api/weather');

module.exports.main = async (req, res) => {
    res.locals.weather = await getWeather(req.query);

    const newsCategories = {
        newsCategoriesTitle: config.get('newsCategoriesTitle'),
        newsCategories: config.get('newsCategories').map(category => {
            category.country = req.query.country;
            category.location = res.locals.weather.today === undefined
                ? undefined
                : res.locals.weather.today.location;

            return category;
        })
    };

    const data = Object.assign(newsCategories, res.locals);

    res.render('index', data);
};
