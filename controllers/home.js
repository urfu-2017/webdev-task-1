'use strict';

const generic = require('../data/generic');
const header = require('../data/header');
const footer = require('../data/footer');
const categories = require('../data/categories');
const { WeatherWidget } = require('../widgets/weather');

exports.home = (req, res) => {
    const data = {};
    Object.assign(data, generic);
    Object.assign(data, header);
    Object.assign(data, footer);
    Object.assign(data, { categories });
    Object.assign(data, { categoryCaption: 'Категории новостей' });

    const weatherWidget = new WeatherWidget(req);
    weatherWidget.getWeather(req)
        .then((weather) => {
            Object.assign(data, weather);
            res.render('home', data);
        })
        .catch((err) => {
            console.error(err);
        });
};
