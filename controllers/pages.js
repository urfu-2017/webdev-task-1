'use strict';

const queryString = require('querystring');
const { getWeather } = require('../models/weather');
const { getNews } = require('../models/news');

const CATEGORIES = [
    {
        en: 'business',
        ru: 'Бизнес'
    },
    {
        en: 'entertainment',
        ru: 'Развлечения'
    },
    {
        en: 'general',
        ru: 'Общее'
    },
    {
        en: 'health',
        ru: 'Здоровье'
    },
    {
        en: 'science',
        ru: 'Наука'
    },
    {
        en: 'sports',
        ru: 'Спорт'
    },
    {
        en: 'technology',
        ru: 'Технологии'
    }];
const META_DATA = { title: 'Илон слишком занят', categories: CATEGORIES };

exports.error404 = (req, res) => {
    res.status(404).send('Данная страница не существует');
};

exports.renderMainPage = async (req, res) => {
    let diContainer = Object.assign({}, META_DATA);
    saveQueryParameters(diContainer, req);
    Object.assign(diContainer, await getWeather(req));
    res.render('home', diContainer);
};

exports.renderNewsPage = async (req, res) => {
    if (!isCorrectPath(req)) {
        module.exports.error404(req, res);

        return;
    }
    let diContainer = Object.assign({}, META_DATA);
    saveQueryParameters(diContainer, req);
    let weather = getWeather(req).then(result => Object.assign(diContainer, result));
    let news = getNews(req).then(result => Object.assign(diContainer, result));
    await weather;
    await news;
    res.render('news', diContainer);
};

function saveQueryParameters(target, req) {
    target.query = queryString.stringify(req.query);
}

function isCorrectPath(req) {
    return CATEGORIES.map(category => category.en).includes(req.params.category);
}
