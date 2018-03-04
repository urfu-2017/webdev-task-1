'use strict';

const config = require('../config');

module.exports = data => ({
    block: 'page',
    title: 'Welcome',
    content: [
        {
            block: 'header',
            title: config.views.title,
            mix: { block: 'page', elem: 'header' }
        },
        {
            block: 'categories',
            tag: 'main',
            content: data.categories.map(category => ({
                block: 'category',
                name: category.key,
                text: category.name,

                mix: { block: 'categories', elem: 'item' }
            }))
        },
        {
            block: 'content',
            tag: 'pre',
            content: JSON.stringify(data.weatherData, null, 2)
        }
    ]
});
