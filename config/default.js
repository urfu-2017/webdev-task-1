'use strict';

module.exports = {
    port: 8080,
    defaultCity: 'moscow',
    weatherURL: 'https://www.metaweather.com/api/location/',
    newsURL: 'https://newsapi.org/v2/top-headlines',
    key: '312ce60d1fca4335896fee931ab1a01b',
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
