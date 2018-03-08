'use strict';

const { getWeather } = require('../api/weather');
const { newsCategories, newsCategoriesTitle } = require('../config/default.json');

module.exports.main = async (req, res) => {
    res.locals.isMainPage = true;
    res.locals.weather = await getWeather(req.query);

    const newsCategoriesBlock = {
        newsCategoriesTitle: newsCategoriesTitle,
        newsCategories: newsCategories.map(category => {
            category.country = req.query.country;
            category.location = res.locals.weather.today === undefined
                ? undefined
                : res.locals.weather.today.location;

            return category;
        })
    };

    const data = Object.assign(newsCategoriesBlock, res.locals);

    res.render('index', data);
};
