'use strict';

const Weather = require('../models/weather');
const Category = require('../models/category');

exports.list = async (req, res) => {
    let weather;
    try {
        weather = await Weather.get(req.query);
    } catch (error) {
        console.error(error.message);
    }

    res.render('page-categories', {
        title: 'Главная страница',
        categories: Category.all(),
        weather
    });
};
