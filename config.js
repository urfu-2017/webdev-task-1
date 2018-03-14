'use strict';

require('dotenv').config();

module.exports = {
    port: process.env.PORT,
    defaultCity: 'moscow',
    weatherURL: 'https://www.metaweather.com/api/location/',
    newsURL: 'https://newsapi.org/v2/top-headlines',
    key: process.env.NEWSAPI_KEY,
    categories: [
        { href: '../business', categoryName: 'Бизнес' },
        { href: '../entertainment', categoryName: 'Развлечение' },
        { href: '../general', categoryName: 'Общее' },
        { href: '../health', categoryName: 'Здоровье' },
        { href: '../science', categoryName: 'Наука' },
        { href: '../sport', categoryName: 'Спорт' },
        { href: '../technology', categoryName: 'Технологии' }
    ],
    defaultCountry: 'ru'
};
