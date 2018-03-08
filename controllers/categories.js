'use strict';

const querystring = require('querystring');

const Category = require('../models/category');
exports.getCategories = (req, res) => {
    const query = querystring.stringify(req.query);
    const categories = [
        new Category(`/news/general?${query}`, 'Общее', 'icons/text-lines.svg', 'text lines'),
        new Category(`/news/business?${query}`, 'Бизнес', 'icons/money-bag.svg', 'money bag'),
        new Category(`/news/entertainment?${query}`, 'Развлечения', 'icons/smile.svg', 'smile'),
        new Category(`/news/sport?${query}`, 'Спорт', 'icons/soccer.svg', 'ball'),
        new Category(`/news/health?${query}`, 'Здоровье', 'icons/cardiogram.svg', 'cardiogram'),
        new Category(`/news/science?${query}`, 'Наука', 'icons/science.svg', 'science'),
        new Category(`/news/tech?${query}`, 'Технологии', 'icons/rocket.svg', 'rocket')
    ];

    res.render('index', { 'categories': categories, 'weather': req.weatherInfo });
};
