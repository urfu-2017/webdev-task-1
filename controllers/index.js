'use strict';

const Category = require('../models/category');


exports.categoriesList = (req, res) => {

    let categories = Category.getAllCategories();

    res.render('index', getDataRendering({ ...res.locals, categories }));

};

exports.newsList = (req, res) => {
    let category = req.params.category;
    let country = res.locals.defaultCountry;
    let language = res.locals.defaultLanguage;

    Category.getNews(category, country, language).then(articles => {
        let homePage = res.locals.homePage;
        res.render('news', getDataRendering({ articles, ...res.locals, homePage }));
    });
};

function getDataRendering(partialData) {
    let currentYear = new Date().getFullYear();

    return { ...partialData, currentYear };
}
