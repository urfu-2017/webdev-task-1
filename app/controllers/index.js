'use strict';
const metaData = require('../data/meta');
const indexData = require('../data/index');
const newsPageData = require('../data/news-page');
const getWeather = require('../models/get-weather');

exports.indexPage = async (req, res) => {
    const weather = await getWeather(req.query);

    res.render('index', Object.assign({ weather }, indexData, metaData));
};

exports.newsPage = async (req, res) => {
    const weather = await getWeather(req.query);

    res.render('index', Object.assign({ weather }, newsPageData, metaData));
};
