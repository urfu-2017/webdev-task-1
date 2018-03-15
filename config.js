'use strict';

require('dotenv').config();

module.exports = {
    port: 8080,
    defaultCity: 'moscow',
    weatherURL: 'https://www.metaweather.com/api/location/',
    newsURL: 'https://newsapi.org/v2/top-headlines',
    newsKey: process.env.NEWSAPI_KEY,
    categories: [
        { key: 'business', categoryName: 'Бизнес' },
        { key: 'entertainment', categoryName: 'Развлечение' },
        { key: 'general', categoryName: 'Общее' },
        { key: 'health', categoryName: 'Здоровье' },
        { key: 'science', categoryName: 'Наука' },
        { key: 'sport', categoryName: 'Спорт' },
        { key: 'technology', categoryName: 'Технологии' }
    ],
    defaultCountry: 'ru'
};
