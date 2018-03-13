'use strict';

module.exports = data => ({
    block: 'page',
    title: data.category,
    content: [
        {
            block: 'header',
            title: `${data.category} news`,
            showHomeLink: true,
            mix: { block: 'page', elem: 'header' }
        },
        {
            block: 'weather',
            data: data.weatherData,
            mix: { block: 'page', elem: 'widget' }
        },
        {
            block: 'posts',
            tag: 'main',
            content: data.posts.map(post => ({
                block: 'post',
                post: post,
                mix: { block: 'posts', elem: 'item' }
            }))
        }
    ]
});
