'use strict';

module.exports = {
    server: {
        port: 8080,
        host: 'localhost'
    },

    newsApiKey: process.env.NEWS_API_KEY,
    newsApiUrl: 'https://newsapi.org/v2/top-headlines?',
    weatherApiUrl: 'https://www.metaweather.com/api/location/',

    staticBasePath: '/',
    views: {
        lang: 'en',
        charset: 'utf-8',
        title: 'Proxy News'
    }
};
