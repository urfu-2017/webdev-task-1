'use strict';

module.exports = {
    ERRORS: {
        NO_SUCH_CATEGORY: 'Такой новостной категории не существует',
        CANT_LOCATE: 'Невозможно определить ваше местоположение',
        NO_COUNTRY: 'Невозможно определить вашу страну'
    },
    URLS: {
        weather: 'https://www.metaweather.com/api/location/',
        news: 'https://newsapi.org/v2/top-headlines/'
    },
    apiKey: '025c61be830041afb1f2544329208b32',
    categories: [
        { name: 'Бизнесс', url: 'business', category: 'business', icon: '/img/money.png' },
        {
            name: 'Развлечения', url: 'entertainment', category: 'entertainment',
            icon: '/img/smiley.png'
        },
        { name: 'Общее', url: 'all', category: '', icon: '/img/search.png' },
        { name: 'Здоровье', url: 'health', category: 'health', icon: '/img/heart.png' },
        { name: 'Наука', url: 'science', category: 'science', icon: '/img/science.png' },
        { name: 'Спорт', url: 'sport', category: 'sport', icon: '/img/ball.png' },
        { name: 'Технологии', url: 'technology', category: 'technology', icon: '/img/rocket.png' }
    ],
    document: {
        title: 'Илон не смог, а я смогу',
        header: {
            title: 'Супер Новости'
        },
        weather: {
            staticUrl: 'https://www.metaweather.com/static/img/weather/',
            curTempMsg: 't',
            windSrc: '/img/wind.png',
            tempSrc: '/img/gradus.png'
        },
        categories: {
            title: 'Категории новостей'
        },
        article: {
            noDescMessage: 'У этой новости нет описания',
            sourceText: 'Источник'
        },
        footer: {
            author: 'Tave',
            year: 2018
        }
    }
};
