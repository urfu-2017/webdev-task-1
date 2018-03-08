'use strict'

const weatherProvider = require('./weather');
const NEWS_CATEGORIES = [
    { titleRu: 'Бизнес',      titleEn: 'business' },
    { titleRu: 'Развлечения', titleEn: 'entertainment' },
    { titleRu: 'Общее',       titleEn: 'general' },
    { titleRu: 'Здоровье',    titleEn: 'health' },
    { titleRu: 'Наука',       titleEn: 'science' },
    { titleRu: 'Спорт',       titleEn: 'sports' },
    { titleRu: 'Технологии',  titleEn: 'technology' }
]

exports.home = async (req, res) => {
    const weather = await weatherProvider.getWeatherInfoAsync(req);

    const data = { weather: weather, categories: NEWS_CATEGORIES, ...res.locals };

    res.render('index', data);
}