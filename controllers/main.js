'use strict';

const Weather = require('../models/weather');
const News = require('../models/news');

const category = [
    { englishName: 'business', russianName: 'Бизнес' },
    { englishName: 'entertainment', russianName: 'Развлечения' },
    { englishName: 'general', russianName: 'Общее' },
    { englishName: 'health', russianName: 'Здоровье' },
    { englishName: 'science', russianName: 'Наука' },
    { englishName: 'sports', russianName: 'Спорт' },
    { englishName: 'technology', russianName: 'Технологии' }
];

exports.main = async (req, res) => {
    const locals = res.locals;

    const weatherJSON = await Weather.getWeatherJSON(req);
    const weather = Weather.getWeatherData(weatherJSON);

    const data = { weather, category, locals };

    res.render('index', data);
};

exports.news = async (req, res) => {
    const locals = res.locals;

    const weatherJSON = await Weather.getWeatherJSON(req);
    const weather = Weather.getWeatherData(weatherJSON);

    const newsJSON = await News.getNewsJSON(req);
    const news = News.getNewsData(newsJSON);

    const data = { weather, news, locals };

    res.render('news_category', data);
};
