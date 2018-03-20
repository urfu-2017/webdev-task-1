'use strict';

const generic = require('../data/generic');
const header = require('../data/header');
const footer = require('../data/footer');
const categoriesData = require('../data/categories');
const { Weather } = require('../models/weather');

exports.home = (req, res) => {
    const data = { };
    Object.assign(data, generic, header, footer, categoriesData);

    Weather.getWeather(req)
        .then((weather) => {
            Object.assign(data, weather);
            res.render('home', data);
        })
        .catch((err) => {
            console.error(err);
            res.sendStatus(500);
        });
};
