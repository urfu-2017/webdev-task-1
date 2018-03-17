'use strict';

const NewsService = require('../dataAccess/newsService');
const CategoriesRepository = require('../dataAccess/categoriesRepository');
const categoriesRepository = new CategoriesRepository();
const newsService = new NewsService();

exports.news = async (req, res) => {
    const category = categoriesRepository.get(req.params.category);
    const news = await newsService.getByCategory(category, req.query.country);
    const data = { news, ...res.locals };

    res.render('news', data);
};

exports.categories = async (req, res) => {
    const categories = categoriesRepository.getAll();
    const data = { categories, ...res.locals };

    res.render('categories', data);
};
