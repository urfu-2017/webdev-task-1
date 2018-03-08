'use strict';

const Weather = require('../models/weather');
const Category = require('../models/category');

exports.list = async (req, res) => {
    let weather;
    try {
        weather = await Weather.filter(req.query);
    } catch (e) {
        console.error(e.message);
    }

    res.render('page-categories', {
        title: 'Главная страница',
        categories: Category.all(),
        weather
    });
};
