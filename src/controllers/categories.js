'use strict';

const Weather = require('../models/weather');
const Category = require('../models/category');

exports.list = async (req, res) => {
    let weather;
    try {
        weather = await Weather.filter(req.query);
    } catch (e) {
        res.status(500).send(e.message);

        return;
    }

    res.render('page-categories', {
        title: 'Главная страница',
        categories: Category.all(),
        weather
    });
};
