'use strict';

const News = require('../models/news');
const Weather = require('../models/weather');
const Category = require('../models/category');
const { NotFound } = require('../utils/exceptions');

async function list(req, res) {
    const category = Category.get(req.params.category);

    if (!category) {
        throw new NotFound('Указанная категория не найдена');
    }

    res.render('page-news', {
        title: category.title,
        back: {
            url: '/',
            text: 'На главную'
        },
        weather: await Weather.get(req.query),
        news: await News.filter(category.name, req.query)
    });
}

module.exports = { list };
