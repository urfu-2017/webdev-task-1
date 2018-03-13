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
            block: 'weather',
            data: data.weatherData,
            mix: { block: 'page', elem: 'widget' }
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
        }
    ]
});
