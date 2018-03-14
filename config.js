'use strict';

module.exports = {
    defaultWeatherCity: 'moscow',
    defaultNewsCountry: 'ru',
    newsUrl: 'https://newsapi.org/v2/top-headlines?',
    apiToken: '&apiKey=d333fab019c840009dd5a977f05c7280',
    weatherUrl: 'https://www.metaweather.com/api/location/',
    port: 8080,
    category: [{ name: '💼 Бизнес', href: '/news/business' },
        { name: '😀 Развлечения', href: '/news/entertainment' },
        { name: '📄 Общее', href: '/news/all' }, { name: '❤️ Здоровье', href: '/news/health' },
        { name: '🔬 Наука', href: '/news/science' }, { name: '🏀 Спорт', href: '/news/sport' },
        { name: '🛰 Технологии', href: '/news/technology' }]
};
