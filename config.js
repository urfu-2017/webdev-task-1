'use strict';

module.exports = {
    server: {
        port: 8080,
        host: 'localhost'
    },

    newsApiKey: process.env.NEWS_API_KEY,
    staticBasePath: '/',

    views: {
        lang: 'en',
        charset: 'utf-8',
        title: 'Proxy News'
    }
};
