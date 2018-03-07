'use strict';

module.exports = {
    debug: true,
    port: 8080,
    newsApiKey: 'e39d2025cd894808b733aafe8f80320f',
    newsApiDomain: 'https://newsapi.org/v2/top-headlines/',
    weatherApiDomain: 'https://www.metaweather.com/',
    locationSearchApi: 'api/location/search/',
    weatherApi: 'api/location/',
    staticBasePath: '/',
    apiRequestTimeout: 8000,

    defaultQuery: {
        query: 'Moscow',
        country: 'ru'
    },

    newsCategories: {
        'business': 'Бизнес',
        'entertainment': 'Развлечения',
        'general': 'Общее',
        'health': 'Здоровье',
        'science': 'Наука',
        'sports': 'Спорт',
        'technology': 'Технологии'
    },

    meta: {
        charset: 'utf-8',
        description: 'Local news and weather'
    },

    title: 'Название'
};
