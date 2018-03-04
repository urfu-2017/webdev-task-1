'use strict';

module.exports = bh => bh.match('header', (ctx, json) => {
    ctx.tag('header');
    const elems = [];

    elems.push({
        elem: 'title',
        tag: 'h1',
        content: json.title
    });

    if (json.showHomeLink) {
        elems.push({
            block: 'link',
            to: '/',
            content: 'Go to home',
            mix: { block: 'header', elem: 'home_link' }
        });
    }

    ctx.content(elems);
});
