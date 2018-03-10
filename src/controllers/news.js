'use strict';

const Weather = require('../models/weather');
const Category = require('../models/category');
const News = require('../models/news');

exports.list = async (req, res) => {
    const category = Category.get(req.params.category);

    if (!category) {
        res.status(404).send('Указанная категория не найдена');

        return;
    }

    let news;
    let weather;
    try {
        news = await News.filter(category.name, req.query);
        weather = await Weather.get(req.query);
    } catch (error) {
        console.error(error.message);
    }

    res.render('page-news', {
        title: category.title,
        back: {
            url: '/',
            text: 'На главную'
        },
        news,
        weather
    });
};
